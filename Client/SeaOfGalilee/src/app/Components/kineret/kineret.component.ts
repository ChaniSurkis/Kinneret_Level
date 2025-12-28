/* kineret.component.ts – עם גלשן אחיד‑מהירות בכל טווח */
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { KineretServiceService } from '../../Service/kineret-service.service';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-kineret',
  templateUrl: './kineret.component.html',
  styleUrls: ['./kineret.component.css']
})
export class KineretComponent implements OnInit, OnDestroy {

  getAllData: any[] = [];
  getByRange: any[] = [];
  chart!: Chart;

  @ViewChild('kineretChart', { static: true }) chartRef!: ElementRef;

  selectedRange = '';
  startDate = '';
  endDate   = '';
  today     = '';

  /* ───────────── 🆕 גלשן ───────────── */
  private surfPos   = 0;                        // ערך רציף (לא רק אינדקסים שלמים)
  private surfStep  = 0.2;                      // יחושב לאחר יצירת הגרף
  private surfRAF!: number;                     // מזהה requestAnimationFrame

  private surfEmojiPlugin = {
    id: 'surf-emoji',
    afterDraw: (chart: Chart) => {
      const data = chart.data.datasets[0]?.data as number[] | undefined;
      if (!data?.length) return;

      const xScale: any = (chart as any).scales['x'];
      const yScale: any = (chart as any).scales['y'];
      if (!xScale || !yScale) return;

      /* חישוב X לפי surfPos (רציף) */
      const x = xScale.getPixelForValue(this.surfPos);

      /* אינטרפולציה ליניארית כדי לקבל Y חלק */
      const idx   = Math.floor(this.surfPos);
      const ratio = this.surfPos - idx;
      const yVal  = (1 - ratio) * data[idx] + ratio * data[(idx + 1) % data.length];
      const y     = yScale.getPixelForValue(yVal) - 12;  // 12px מעל הקו

      const ctx = chart.ctx;
      ctx.save();
      ctx.font = '32px "Segoe UI Emoji", sans-serif';     // גודל גלשן
      ctx.textAlign = 'center';
      ctx.fillText('🏄‍♂️', x, y);
      ctx.restore();
    }
  };
  /* ────────── סוף גלשן ────────── */

  constructor(private kineretServiceService: KineretServiceService) {}

  /* ─── lifecycle ─── */
  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    Chart.register(this.surfEmojiPlugin);                // רישום plugin
    this.kineretServiceService.getAll().subscribe(d => this.getAllData = d);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.surfRAF);
    if (this.chart) this.chart.destroy();
  }

  /* ─── פונקציות טווח ותאריכים (ללא שינוי מהותי) ─── */
  onRangeChange(range: string) {
    const toDate   = new Date();
    const fromDate = new Date(toDate);

    switch (range) {
      case 'week':     fromDate.setDate(toDate.getDate() - 7);  break;
      case 'month':    fromDate.setMonth(toDate.getMonth() - 1); break;
      case 'halfYear': fromDate.setMonth(toDate.getMonth() - 6); break;
      case 'year':     fromDate.setFullYear(toDate.getFullYear() - 1); break;
    }

    this.kineretServiceService.getByRange(
      fromDate.getFullYear(), fromDate.getMonth() + 1, fromDate.getDate(),
      toDate  .getFullYear(), toDate  .getMonth() + 1, toDate  .getDate()
    ).subscribe(d => { this.getByRange = d; this.createChartFromRange(d); });
  }

  loadChartByDates() {
    if (!this.startDate || !this.endDate) { alert('יש לבחור תאריכים התחלה וסיום'); return; }
    const from = new Date(this.startDate);
    const to   = new Date(this.endDate);
    if (from > to) { alert('תאריך ההתחלה לא יכול להיות אחרי תאריך הסיום'); return; }

    this.kineretServiceService.getByRange(
      from.getFullYear(), from.getMonth() + 1, from.getDate(),
      to  .getFullYear(), to  .getMonth() + 1, to  .getDate()
    ).subscribe(d => { this.getByRange = d; this.createChartFromRange(d); });
  }

  /* ─── יצירת גרף + אנימציית גלשן אחידה ─── */
  createChartFromRange(data: any[]) {
    const labels = data.map(i => new Date(i.surveyDate).toLocaleDateString()).reverse();
    const values = data.map(i => Number(i.level)).reverse();

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'מפלס הכנרת לפי טווח',
          data: values,
          borderColor: 'white',
          backgroundColor: 'rgba(0,191,255,0.4)',
          fill: 'start',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, labels: { color: 'white' } },
          title:  {
            display: true,
            text: 'מפלס הכנרת לפי תאריכים בטווח שנבחר',
            color: '#19a1eaff',
            font: { size: 24 }
          }
        },
        scales: {
          y: {
            min: -213, max: -209.8,
            ticks: { stepSize: 0.2 },
            title: { display: true, text: 'גובה המפלס (מטרים)' }
          },
          x: { type: 'category', title: { display: true, text: 'תאריך' } }
        }
      }
    });

    /* ——— 🆕 חישוב צעד פיקסלים קבוע + לולאת RAF ——— */
    const pixelStep = 3;                               // כמה פיקסלים כל פריים
    const { left, right } = this.chart.chartArea;
    const width   = right - left;
    this.surfStep = pixelStep * (labels.length - 1) / width;

    cancelAnimationFrame(this.surfRAF);
    this.surfPos = 0;

    const animate = () => {
      this.surfPos = (this.surfPos + this.surfStep) % (labels.length - 1);
      this.chart.update('none');                       // ריענון מהיר
      this.surfRAF = requestAnimationFrame(animate);
    };
    this.surfRAF = requestAnimationFrame(animate);
  }
}
