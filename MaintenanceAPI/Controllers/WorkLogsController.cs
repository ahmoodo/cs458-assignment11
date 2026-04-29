using MaintenanceAPI.Data;
using MaintenanceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MaintenanceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkLogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkLogsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var logs = await _context.WorkLogs.ToListAsync();
            return Ok(logs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var log = await _context.WorkLogs.FindAsync(id);
            if (log == null) return NotFound();
            return Ok(log);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] WorkLog log)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (log.ClockOutTime <= log.ClockInTime)
                return BadRequest("ClockOutTime must be after ClockInTime.");

            _context.WorkLogs.Add(log);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = log.LogID }, log);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] WorkLog updated)
        {
            if (id != updated.LogID) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (updated.ClockOutTime <= updated.ClockInTime)
                return BadRequest("ClockOutTime must be after ClockInTime.");

            // Check the record actually exists before attempting to update.
            // Without this, if the row was deleted between GET and PUT,
            // EF throws a DbUpdateConcurrencyException instead of returning 404.
            var exists = await _context.WorkLogs.AnyAsync(w => w.LogID == id);
            if (!exists) return NotFound();

            _context.Entry(updated).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Another concurrent writer deleted the row between our check and the save.
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var log = await _context.WorkLogs.FindAsync(id);
            if (log == null) return NotFound();

            _context.WorkLogs.Remove(log);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
