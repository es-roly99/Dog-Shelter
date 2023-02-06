
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Dog
    {
        public int DogId { get; set; }
        public string DogName { get; set; }
        public string Shelter { get; set; }
        public string DateOfJoining { get; set; }
        public string PhotoFileName { get; set; }

    }
}
