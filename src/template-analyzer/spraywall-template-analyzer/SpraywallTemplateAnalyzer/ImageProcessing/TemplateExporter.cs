using SpraywallTemplateAnalyzer.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;

namespace SpraywallTemplateAnalyzer.ImageProcessing {
   internal class TemplateExporter {
      private const int CONTOUR_MAX_SIZE = 50;

      private TemplateExporter() { }
      public static ExportTemplate Export(string encodedImage, IEnumerable<Hold> holds) {
         return new ExportTemplate() {
            EncodedImage = encodedImage,
            Holds = ExportHolds(holds)
         };
      }

      private static IEnumerable<ExportHold> ExportHolds(IEnumerable<Hold> holds) {
         foreach (var hold in holds) {
            var center = new Point((int) hold.Contour.Average(h => h.X), (int) hold.Contour.Average(h => h.Y));
            var radius = (uint) Math.Sqrt(hold.Contour.Max(p => Math.Pow(center.X - p.X, 2) + Math.Pow(center.Y - p.Y, 2)));

            yield return new ExportHold() {
               Center = center,
               MinRect = hold.MinRect,
               Radius = radius,
               Contour = ReduceContour(hold.Contour),
            };
         }
      }

      private static Point[] ReduceContour(Point[] contour) {
         List<Point> contourPoints = new List<Point>();
         if (contour.Length <= CONTOUR_MAX_SIZE) {
            return contour;
         } else {
            float ratio = (float) contour.Length / CONTOUR_MAX_SIZE;
            for (int i = 0; i < CONTOUR_MAX_SIZE; i++) {
               var section = contour.Take(new Range((Index) (i * ratio), (Index) Math.Min(Math.Ceiling((i + 1) * ratio - 1), contour.Length - 1)));
               if (section.Any()) {
                  int x = (int) section.Average(p => p.X);
                  int y = (int) section.Average(p => p.Y);
                  contourPoints.Add(new Point(x, y));
               }
            }
            return contourPoints.ToArray();
         }
      }
   }
}
