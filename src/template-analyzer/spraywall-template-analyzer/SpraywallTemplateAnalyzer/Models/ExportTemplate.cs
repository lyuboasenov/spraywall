using Emgu.CV.Structure;
using SpraywallTemplateAnalyzer.ImageProcessing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpraywallTemplateAnalyzer.Models {
   public class ExportTemplate {
      public IEnumerable<Hold> Holds { get; set; }
      public string EncodedImage { get; set; }
   }
}
