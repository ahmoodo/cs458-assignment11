using System.ComponentModel.DataAnnotations;

namespace MaintenanceAPI.Models
{
    public class Invoice
    {
        [Key]
        public int InvoiceID { get; set; }

        public int? ProjectID { get; set; }
        public int? ScheduleID { get; set; }

        // Use UtcNow so the timestamp is timezone-neutral and consistent
        // regardless of the server's local time zone.
        public DateTime InvoiceDate { get; set; } = DateTime.UtcNow;

        [Required]
        public decimal TotalAmount { get; set; }

        public bool IsExported { get; set; } = false;
    }
}
