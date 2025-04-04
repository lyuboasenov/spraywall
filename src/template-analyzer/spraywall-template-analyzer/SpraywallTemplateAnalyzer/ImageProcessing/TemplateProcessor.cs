﻿using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using Emgu.CV;
using System.Collections.Generic;
using System.Linq;
using System.Drawing;
using System;

namespace SpraywallTemplateAnalyzer.ImageProcessing {
   internal class TemplateProcessor {

      private string _imgLocation;
      private const int MIN_SIZE = 10;
      private List<Hold> _holds = new List<Hold>();

      public uint MaxSize { get; set; } = 5000;
      public uint MinArea { get; set; } = 10;
      public uint MaxRatio { get; set; } = 30;
      public double CannyThreshold { get; set; } = 180;
      public double CircleAccumulatorThreshold { get; set; } = 120;

      public IEnumerable<Hold> Holds { get {  return _holds; } }
      public IEnumerable<Hold> FilteredHolds { 
         get {
            var result = new List<Hold>();
            foreach (var rect in _holds.Where(h => IsValid(h.MinRect))) {
               result.Add(rect);
            }
            return result;
         } 
      }

      private TemplateProcessor() {

      }

      private TemplateProcessor(string imgLocation) {
         _imgLocation = imgLocation;
      }

      public static TemplateProcessor Process(string imgLocation) {
         var processor = new TemplateProcessor(imgLocation);
         processor.ProcessImage();

         return processor;
      }

      public static TemplateProcessor Import(IEnumerable<Hold> enumerable, uint maxSize, uint minArea, uint maxRatio) {
         var processor = new TemplateProcessor();
         processor._holds.AddRange(enumerable);
         processor.MaxSize = maxSize;
         processor.MinArea = minArea;
         processor.MaxRatio = maxRatio;

         return processor;
      }

      public void Remove(Hold rect) {
         _holds.Remove(rect);
      }

      public Hold Add(IEnumerable<Point> points) {
         var rect = CvInvoke.MinAreaRect(points.Select(p => new PointF(p.X, p.Y)).ToArray());
         var hold = new Hold() {
            Contour = points.ToArray(),
            MinRect = rect
         };
         _holds.Insert(0, hold);

         return hold;
      }

      public bool IsValidSize(RotatedRect r) {
         return r.Size.Width < MaxSize && r.Size.Height < MaxSize;
      }

      public bool IsValidArea(RotatedRect r) {
         return r.Size.Width * r.Size.Height > MinArea;
      }

      public bool IsValidRatio(RotatedRect r) {
         if (r.Size.Width > r.Size.Height) {
            return r.Size.Width / r.Size.Height < MaxRatio;
         } else {
            return r.Size.Height / r.Size.Width < MaxRatio;
         }
      }

      public bool IsValid(RotatedRect r) {
         return IsValidSize(r) && IsValidArea(r) && IsValidRatio(r);
      }

      public void ProcessImage() {
         _holds.Clear();

         using (Mat img = new Mat(_imgLocation))
         using (UMat gray = new UMat())
         using (UMat cannyEdges = new UMat())
         using (VectorOfVectorOfPoint contours = new VectorOfVectorOfPoint()) {
            //Convert the image to grayscale and filter out the noise
            CvInvoke.CvtColor(img, gray, ColorConversion.Bgr2Gray);

            //Remove noise
            CvInvoke.GaussianBlur(gray, gray, new Size(3, 3), 1);

            CvInvoke.Canny(gray, cannyEdges, CannyThreshold, CircleAccumulatorThreshold);

            CvInvoke.FindContours(cannyEdges, contours, null, RetrType.List, ChainApproxMethod.ChainApproxSimple);

            int count = contours.Size;
            uint index = 0;
            for (int i = 0; i < count; i++) {
               using (VectorOfPoint contour = contours[i])
               using (VectorOfPoint approxContour = new VectorOfPoint()) {

                  var points = contour.ToArray();
                  points = RearrangeContour(points);

                  CvInvoke.ApproxPolyDP(contour, approxContour, CvInvoke.ArcLength(contour, true) * 0.005, true);
                  RotatedRect rect = CvInvoke.MinAreaRect(approxContour);

                  if (rect.Size.Width > MIN_SIZE && rect.Size.Height > MIN_SIZE) {
                     if (points.Length > 5) {
                        var center = new Point() {
                           X = (int) points.Average(p => p.X),
                           Y = (int) points.Average(p => p.Y)
                        };
;                        var radiusSq = points.Max(p => Math.Pow(center.X - p.X, 2) + Math.Pow(center.Y - p.Y, 2));

                        _holds.Add(new Hold() {
                           MinRect = rect,
                           Contour = points,
                           Center = center,
                           Radius = (uint) Math.Sqrt(radiusSq),
                           Index = index++
                        });
                     }
                  }
               }
            }
         }
      }

      public static  Point[] RearrangeContour(Point[] points) {
         var source = new List<Point>(points);
         var result = new List<Point>();

         var first = source[0];
         var last = first;
         result.Add(last);
         source.Remove(last);

         while(source.Any()) {
            var minDistanceSquared = source.Min(p => Math.Pow(p.X - last.X, 2) + Math.Pow(p.Y - last.Y, 2));
            var distanceToStartSquared = Math.Pow(first.X - last.X, 2) + Math.Pow(first.Y - last.Y, 2);
            if (source.Count < result.Count && minDistanceSquared > distanceToStartSquared) {
               break;
            }
            last = source.First(p => Math.Pow(p.X - last.X, 2) + Math.Pow(p.Y - last.Y, 2) == minDistanceSquared);

            source.Remove(last);
            result.Add(last);
         }

         return result.ToArray();
      }
   }
}
