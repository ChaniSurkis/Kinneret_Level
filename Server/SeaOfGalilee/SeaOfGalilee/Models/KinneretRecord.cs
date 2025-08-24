namespace KinneretApi.Models;

/// <summary>
/// מודל “נקי” לשימוש פנימי / החזרה ללקוח
/// </summary>
public class KinneretRecord
{
    public int Id { get; set; }
    public DateOnly SurveyDate { get; set; }
    public double Level { get; set; }
}
