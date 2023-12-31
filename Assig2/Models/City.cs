﻿using System;
using System.Collections.Generic;

namespace Assig2.Models
{
    public partial class City
    {
        public City()
        {
            AirQualityData = new HashSet<AirQualityData>();
        }

        public int CityId { get; set; }
        public string CityName { get; set; } = null!;
        public int CountryId { get; set; }

        public virtual Country Country { get; set; } = null!;
        public virtual ICollection<AirQualityData> AirQualityData { get; set; }
    }
}
