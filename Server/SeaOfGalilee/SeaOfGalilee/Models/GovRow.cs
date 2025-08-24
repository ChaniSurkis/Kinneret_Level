namespace KinneretApi.Models;

/// <summary>
/// מבנה שורה בדיוק כמו שמתקבל מ‑data.gov.il
/// </summary>
public class GovRow
{
    public int _id { get; set; }
    public string Survey_Date { get; set; } = "";
    public double Kinneret_Level { get; set; }
}
