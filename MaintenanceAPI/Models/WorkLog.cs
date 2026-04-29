using System.ComponentModel.DataAnnotations;

namespace MaintenanceAPI.Models
{
    public class WorkLog
    {
        [Key]
        public int LogID { get; set; }

        public int ProjectID { get; set; }

        // DateTime is a non-nullable value type; [Required] is meaningless on it.
        // Removed [Required] to avoid misleading validation noise.
        public DateTime ClockInTime { get; set; }

        public DateTime ClockOutTime { get; set; }

        public string? GPSLocation { get; set; }
        public string? ProofPhotoURL { get; set; }
        public string? MaterialsUsed { get; set; }
        public string? VendorSignature { get; set; }
    }
}
