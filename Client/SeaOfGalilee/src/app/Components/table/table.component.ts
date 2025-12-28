import { Component ,OnInit} from '@angular/core';
import { KineretServiceService } from '../../Service/kineret-service.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-table',
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
currentPage = 1;
itemsPerPage = 10;
pagedData: any[] = [];
 kineretData: any[] = [];
  constructor(private kineretService: KineretServiceService) {}
  ngOnInit() : void {
    this.loadData();
  console.log(this.kineretData);}
  loadData(): void {
    this.kineretService.getAll().subscribe(data => {
      this.kineretData =  data.result.records; 
        this.setPage(this.currentPage);
    });
  
  }
setPage(page: number) {
  this.currentPage = page;
  const start = (page - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  this.pagedData = this.kineretData.slice(start, end);

}
}
