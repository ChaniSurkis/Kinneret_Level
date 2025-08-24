using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using KinneretApi.Models;

public class KinneretService
{
    private readonly HttpClient _httpClient;
    private const string Url =
        "https://data.gov.il/api/3/action/datastore_search" +
        "?resource_id=2de7b543-e13d-4e7e-b4c8-56071bc4d3c8&limit=2000";

    public KinneretService(HttpClient httpClient) => _httpClient = httpClient;

    // ───────────────────────────────────────────────────────────
    public async Task<string> GetKinneretDataAsync()
    {
        var resp = await _httpClient.GetAsync(Url);
        resp.EnsureSuccessStatusCode();

        var json = await resp.Content.ReadAsStringAsync();
        if (string.IsNullOrWhiteSpace(json))
            throw new Exception("Empty response from data.gov.il");

        return json;
    }

    // ───────────────────────────────────────────────────────────
    public async Task<List<KinneretRecord>> GetKinneretRecordsAsync()
    {
        var json = await GetKinneretDataAsync();

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true   // <<< העיקר
        };

        var root = JsonSerializer.Deserialize<GovResponse>(json, options)
                   ?? throw new Exception("Failed to deserialize gov.il response");

        var formats = new[] { "d/M/yyyy", "dd/MM/yyyy", "yyyy-MM-dd" };
        var records = new List<KinneretRecord>();

        foreach (var r in root.Result.Records)
        {
            if (!DateOnly.TryParseExact(r.Survey_Date, formats, null,
                    System.Globalization.DateTimeStyles.None, out var date))
                continue; // פשוט דלג אם תאריך חריג

            records.Add(new KinneretRecord
            {
                Id = r._id,
                SurveyDate = date,
                Level = r.Kinneret_Level
            });
        }

        return records;
    }
}
