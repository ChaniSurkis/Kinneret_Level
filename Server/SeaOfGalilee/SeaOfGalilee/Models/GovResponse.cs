using System.Text.Json.Serialization;

namespace KinneretApi.Models;

public class GovResponse
{
    [JsonPropertyName("result")]
    public GovResult Result { get; set; } = new();
}

public class GovResult
{
    [JsonPropertyName("records")]
    public List<GovRow> Records { get; set; } = new();
}
