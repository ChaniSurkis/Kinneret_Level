using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class KinneretController : ControllerBase
{
    private readonly KinneretService _service;
    public KinneretController(KinneretService s) => _service = s;

    // JSON גולמי
    [HttpGet("data/raw")]
    public async Task<IActionResult> GetRaw()
        => Content(await _service.GetKinneretDataAsync(), "application/json");

    // רשימה מסוננת
    // דוגמאות:
    // /kinneret/data?from=2025-06-10&to=2025-06-19
    // /kinneret/data?year=2024&month=10&day=12
    public class FromParts
    {
        [FromQuery(Name = "fromYear")] public int Year { get; set; }
        [FromQuery(Name = "fromMonth")] public int Month { get; set; }
        [FromQuery(Name = "fromDay")] public int Day { get; set; }
    }

    public class ToParts
    {
        [FromQuery(Name = "toYear")] public int Year { get; set; }
        [FromQuery(Name = "toMonth")] public int Month { get; set; }
        [FromQuery(Name = "toDay")] public int Day { get; set; }
    }

    [HttpGet("data")]
    public async Task<IActionResult> Get(
        [FromQuery] FromParts? from = null,
        [FromQuery] ToParts? to = null)
    {
        DateOnly? fromDate = from == null ? null
            : new DateOnly(from.Year, from.Month, from.Day);

        DateOnly? toDate = to == null ? null
            : new DateOnly(to.Year, to.Month, to.Day);

        var rec = await _service.GetKinneretRecordsAsync();

        if (fromDate != null || toDate != null)
            rec = rec.Where(r =>
                     (fromDate == null || r.SurveyDate >= fromDate) &&
                     (toDate == null || r.SurveyDate <= toDate))
                .ToList();

        return Ok(rec);
    }

}
