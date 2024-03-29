using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using SpraywallTemplateAnalyzer.ImageProcessing;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static Emgu.Util.Platform;

namespace SpraywallTemplateAnalyzer {
   /// <summary>
   /// Interaction logic for MainWindow.xaml
   /// </summary>
   public partial class MainWindow : Window {
      private FileInfo sourceImgFileInfo;
      private string imgLocation;
      private TemplateProcessor _processor;

      public MainWindow() {
         InitializeComponent();
      }


      private void btnExport_Click(object sender, RoutedEventArgs e) {
      }

      private void btnBrawses_Click(object sender, RoutedEventArgs e) {
         var dialog = new Microsoft.Win32.OpenFileDialog();
         dialog.FileName = "template"; // Default file name
         dialog.DefaultExt = ".jpg"; // Default file extension
         dialog.Filter = "Images (*.jpg)|*.jpg|Images (*.jpeg)|*.jpeg"; // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            imgLocation = dialog.FileName;
            sourceImgFileInfo = new FileInfo(imgLocation);
            imgSource.Source = new BitmapImage(new Uri(imgLocation));
            _processor = TemplateProcessor.Process(imgLocation);
         }
      }

      private void btnCalculate_Click(object sender, RoutedEventArgs e) {
         Mat m = new Mat(imgLocation);
         // m = ProcessImageHoughDetection(m, int.Parse(txtSize.Text));
         // m = ProcessImageKMeans(m);
         m = ProcessImageColorDetection(m, new Bgr(40, 43, 117));
         string processedImgLocation = System.IO.Path.Combine(sourceImgFileInfo.Directory.FullName, sourceImgFileInfo.Name + "_processed.jpg");
         if (File.Exists(processedImgLocation)) {
            File.Delete(processedImgLocation);
         }
         m.Save(processedImgLocation);
         imgResult.Source = new BitmapImage(new Uri(processedImgLocation));
      }

      public Mat ProcessImageColorDetection(Mat orig, Bgr color) {
         // color = new Bgr(40, 43, 117);
         var img = orig.ToImage<Bgr, byte>();
         using (Mat hsv = new Mat()) {
            CvInvoke.CvtColor(orig, hsv, ColorConversion.Bgr2Hsv);

            img._SmoothGaussian(5);

            Bgr lower = GetLowerBound(color);
            Bgr higher = GetUpperBound(color);

            var mask = img.InRange(lower, higher).Not();
            img.SetValue(new Bgr(0, 0, 0), mask);

            return img.Mat;
         }
      }

      private int offset = 20;
      private Bgr GetLowerBound(Bgr bgr) {
         return new Bgr(
             Math.Max(0, bgr.Blue - offset),
             Math.Max(0, bgr.Green - offset),
             Math.Max(0, bgr.Red - offset)
             );
      }
      private Bgr GetUpperBound(Bgr bgr) {
         return new Bgr(
             Math.Min(255, bgr.Blue + offset),
             Math.Min(255, bgr.Green + offset),
             Math.Min(255, bgr.Red + offset)
             );
      }

      public Mat ProcessImageKMeans(Mat img) {
         Bgr[] clusterColors = new Bgr[]
         {
                new Bgr(0, 0, 255),
                new Bgr(0, 255, 0),
                new Bgr(255, 100, 100),
                new Bgr(255, 0, 255),
                new Bgr(0, 255, 255),
                new Bgr(255, 255, 255)
         };

         var src = img.ToImage<Bgr, float>();
         Matrix<float> samples = new Matrix<float>(src.Rows * src.Cols, 1, 3);
         Matrix<int> finalClusters = new Matrix<int>(src.Rows * src.Cols, 1);

         for (int y = 0; y < src.Rows; y++) {
            for (int x = 0; x < src.Cols; x++) {
               samples.Data[y + x * src.Rows, 0] = (float) src[y, x].Blue;
               samples.Data[y + x * src.Rows, 1] = (float) src[y, x].Green;
               samples.Data[y + x * src.Rows, 2] = (float) src[y, x].Red;
            }
         }

         MCvTermCriteria term = new MCvTermCriteria(100, 0.5);
         term.Type = TermCritType.Iter | TermCritType.Eps;

         int clusterCount = 3;
         int attempts = 5;
         Matrix<Single> centers = new Matrix<Single>(clusterCount, src.Rows * src.Cols);
         CvInvoke.Kmeans(
             samples,
             clusterCount,
             finalClusters,
             term,
             attempts,
             KMeansInitType.PPCenters);

         Image<Bgr, float> new_image = new Image<Bgr, float>(src.Size);

         for (int y = 0; y < src.Rows; y++) {
            for (int x = 0; x < src.Cols; x++) {
               PointF p = new PointF(x, y);
               new_image.Draw(new CircleF(p, 1.0f), clusterColors[finalClusters[y + x * src.Rows, 0]], 1);
            }
         }

         //CvInvoke.cvShowImage("clustered image", new_image);
         //CvInvoke.cvWaitKey(0);

         return new_image.Mat;
      }

      public Mat ProcessImageHoughDetection(Mat img, int size) {
         using (UMat gray = new UMat())
         using (UMat cannyEdges = new UMat())
         using (Mat triangleRectangleImage = new Mat(img.Size, DepthType.Cv8U, 3)) //image to draw triangles and rectangles on
         using (Mat circleImage = new Mat(img.Size, DepthType.Cv8U, 3)) //image to draw circles on
         using (Mat lineImage = new Mat(img.Size, DepthType.Cv8U, 3)) //image to drtaw lines on
         {
            //Convert the image to grayscale and filter out the noise
            CvInvoke.CvtColor(img, gray, ColorConversion.Bgr2Gray);

            //Remove noise
            CvInvoke.GaussianBlur(gray, gray, new System.Drawing.Size(3, 3), 1);

            #region circle detection
            double cannyThreshold = 180.0;
            double circleAccumulatorThreshold = 120;
            CircleF[] circles = CvInvoke.HoughCircles(gray, HoughModes.Gradient, 2.0, 20.0, cannyThreshold,
                circleAccumulatorThreshold, 5);
            #endregion

            #region Canny and edge detection
            double cannyThresholdLinking = 120.0;
            CvInvoke.Canny(gray, cannyEdges, cannyThreshold, cannyThresholdLinking);
            LineSegment2D[] lines = CvInvoke.HoughLinesP(
                cannyEdges,
                1, //Distance resolution in pixel-related units
                Math.PI / 45.0, //Angle resolution measured in radians.
                20, //threshold
                30, //min Line width
                10); //gap between lines
            #endregion

            #region Find triangles and rectangles
            List<Triangle2DF> triangleList = new List<Triangle2DF>();
            List<RotatedRect> boxList = new List<RotatedRect>(); //a box is a rotated rectangle
            List<RotatedRect> otherList = new List<RotatedRect>(); //a box is a rotated rectangle
            using (VectorOfVectorOfPoint contours = new VectorOfVectorOfPoint()) {
               CvInvoke.FindContours(cannyEdges, contours, null, RetrType.List,
                   ChainApproxMethod.ChainApproxSimple);
               int count = contours.Size;
               for (int i = 0; i < count; i++) {
                  using (VectorOfPoint contour = contours[i])
                  using (VectorOfPoint approxContour = new VectorOfPoint()) {
                     CvInvoke.ApproxPolyDP(contour, approxContour, CvInvoke.ArcLength(contour, true) * 0.05,
                         true);

                     //only consider contours with area greater than 250
                     if (CvInvoke.ContourArea(approxContour, false) > size) {
                        if (approxContour.Size == 3) //The contour has 3 vertices, it is a triangle
                        {
                           System.Drawing.Point[] pts = approxContour.ToArray();
                           triangleList.Add(new Triangle2DF(
                               pts[0],
                               pts[1],
                               pts[2]
                           ));
                        } else if (approxContour.Size == 4) //The contour has 4 vertices.
                          {
                           #region determine if all the angles in the contour are within [80, 100] degree
                           bool isRectangle = true;
                           System.Drawing.Point[] pts = approxContour.ToArray();
                           LineSegment2D[] edges = Emgu.CV.PointCollection.PolyLine(pts, true);

                           //for (int j = 0; j < edges.Length; j++)
                           //{
                           //    double angle = Math.Abs(
                           //        edges[(j + 1) % edges.Length].GetExteriorAngleDegree(edges[j]));
                           //    if (angle < 80 || angle > 100)
                           //    {
                           //        isRectangle = false;
                           //        break;
                           //    }
                           //}

                           #endregion

                           // if (isRectangle) boxList.Add(CvInvoke.MinAreaRect(approxContour));
                           boxList.Add(CvInvoke.MinAreaRect(approxContour));
                        } else {
                           System.Drawing.Point[] pts = approxContour.ToArray();
                           LineSegment2D[] edges = Emgu.CV.PointCollection.PolyLine(pts, true);

                           otherList.Add(CvInvoke.MinAreaRect(approxContour));
                        }
                     }
                  }
               }
            }
            #endregion

            #region draw triangles and rectangles
            triangleRectangleImage.SetTo(new MCvScalar(0));
            foreach (Triangle2DF triangle in triangleList) {
               //CvInvoke.Polylines(triangleRectangleImage, Array.ConvertAll(triangle.GetVertices(), System.Drawing.Point.Round),
               //    true, new Bgr(System.Drawing.Color.DarkBlue).MCvScalar, 2);
               CvInvoke.Polylines(img, Array.ConvertAll(triangle.GetVertices(), System.Drawing.Point.Round),
                   true, new Bgr(System.Drawing.Color.LightBlue).MCvScalar, 3);
            }

            foreach (RotatedRect box in boxList) {
               //CvInvoke.Polylines(triangleRectangleImage, Array.ConvertAll(box.GetVertices(), System.Drawing.Point.Round), true,
               //    new Bgr(System.Drawing.Color.DarkOrange).MCvScalar, 2);
               CvInvoke.Polylines(img, Array.ConvertAll(box.GetVertices(), System.Drawing.Point.Round), true,
                   new Bgr(System.Drawing.Color.LightPink).MCvScalar, 3);
            }

            foreach (RotatedRect box in otherList) {
               //CvInvoke.Polylines(triangleRectangleImage, Array.ConvertAll(box.GetVertices(), System.Drawing.Point.Round), true,
               //    new Bgr(System.Drawing.Color.DarkOrange).MCvScalar, 2);
               CvInvoke.Polylines(img, Array.ConvertAll(box.GetVertices(), System.Drawing.Point.Round), true,
                   new Bgr(System.Drawing.Color.LightSeaGreen).MCvScalar, 3);
            }

            //Drawing a light gray frame around the image
            //CvInvoke.Rectangle(triangleRectangleImage,
            //    new System.Drawing.Rectangle(System.Drawing.Point.Empty,
            //        new System.Drawing.Size(triangleRectangleImage.Width - 1, triangleRectangleImage.Height - 1)),
            //    new MCvScalar(120, 120, 120));
            ////Draw the labels
            //CvInvoke.PutText(triangleRectangleImage, "Triangles and Rectangles", new System.Drawing.Point(20, 20),
            //    FontFace.HersheyDuplex, 0.5, new MCvScalar(120, 120, 120));
            #endregion

            //#region draw circles
            //circleImage.SetTo(new MCvScalar(0));
            //foreach (CircleF circle in circles)
            //    CvInvoke.Circle(circleImage, System.Drawing.Point.Round(circle.Center), (int)circle.Radius,
            //        new Bgr(System.Drawing.Color.Brown).MCvScalar, 2);

            ////Drawing a light gray frame around the image
            //CvInvoke.Rectangle(circleImage,
            //    new System.Drawing.Rectangle(System.Drawing.Point.Empty, new System.Drawing.Size(circleImage.Width - 1, circleImage.Height - 1)),
            //    new MCvScalar(120, 120, 120));
            ////Draw the labels
            //CvInvoke.PutText(circleImage, "Circles", new System.Drawing.Point(20, 20), FontFace.HersheyDuplex, 0.5,
            //    new MCvScalar(120, 120, 120));
            //#endregion

            //#region draw lines
            //lineImage.SetTo(new MCvScalar(0));
            //foreach (LineSegment2D line in lines)
            //    CvInvoke.Line(lineImage, line.P1, line.P2, new Bgr(System.Drawing.Color.Green).MCvScalar, 2);
            ////Drawing a light gray frame around the image
            //CvInvoke.Rectangle(lineImage,
            //    new System.Drawing.Rectangle(System.Drawing.Point.Empty, new System.Drawing.Size(lineImage.Width - 1, lineImage.Height - 1)),
            //    new MCvScalar(120, 120, 120));
            ////Draw the labels
            //CvInvoke.PutText(lineImage, "Lines", new System.Drawing.Point(20, 20), FontFace.HersheyDuplex, 0.5,
            //    new MCvScalar(120, 120, 120));
            //#endregion

            Mat result = new Mat();
            //CvInvoke.VConcat(new Mat[] { img, triangleRectangleImage, circleImage, lineImage }, result);
            // return result;
            // return triangleRectangleImage;
            CvInvoke.VConcat(new Mat[] { img }, result);
            return img;
         }
      }
   }
}
