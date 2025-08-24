var builder = WebApplication.CreateBuilder(args);

// ????? Services ???????????????????????????
builder.Services.AddControllers();
builder.Services.AddHttpClient<KinneretService>();

builder.Services.AddCors(o =>
    o.AddDefaultPolicy(p =>
        p.AllowAnyHeader()
         .AllowAnyMethod()
         .WithOrigins("http://localhost:4200"))); // הוסיפי https אם צריך

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ????? App ????????????????????????????????
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();
app.Run();
