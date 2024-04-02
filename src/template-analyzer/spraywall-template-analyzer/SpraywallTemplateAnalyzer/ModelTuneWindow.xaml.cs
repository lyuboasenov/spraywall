using System;
using System.ComponentModel;
using System.Windows;

namespace SpraywallTemplateAnalyzer {
   /// <summary>
   /// Interaction logic for ModelTuneWindow.xaml
   /// </summary>
   public partial class ModelTuneWindow : Window, INotifyPropertyChanged {
      private uint maxSize = 400;
      private uint minArea = 164;
      private uint maxRatio = 4;
      private uint point = 0;
      private double cannyThreshold = 180;
      private double accThreshold = 120;

      public uint MaxSize {
         get => maxSize;
         set {
            if (maxSize != value) {
               maxSize = value;
               PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(MaxSize)));
            }
         }
      }
      public uint MinArea {
         get => minArea;
         set {
            if (minArea != value) {
               minArea = value;
               PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(MinArea)));
            }
         }
      }
      public uint MaxRatio {
         get => maxRatio;
         set {
            if (maxRatio != value) {
               maxRatio = value;
               PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(MaxRatio)));
            }
         }
      }
      public uint Point {
         get => point;
         set {
            if (point != value) {
               point = value;
               PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Point)));
            }
         }
      }
      public double CannyThreshold {
         get => cannyThreshold;
         set {
            if (cannyThreshold != value) {
               cannyThreshold = value;
               PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(CannyThreshold)));
            }
         }
      }
      public double AccThreshold {
         get => accThreshold;
         set {
            if (accThreshold != value) {
               accThreshold = value;
               PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(AccThreshold)));
            }
         }
      }

      public ModelTuneWindow() {
         InitializeComponent();
         this.DataContext = this;
      }

      private void btnDeduplicate_Click(object sender, RoutedEventArgs e) {
         Deduplicate?.Invoke(this, new EventArgs());
      }

      public event PropertyChangedEventHandler? PropertyChanged;
      public event EventHandler Deduplicate;
      public event EventHandler Apply;

      private void btnApply_Click(object sender, RoutedEventArgs e) {
         Apply?.Invoke(this, new EventArgs());
      }
   }
}
