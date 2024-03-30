using System;
using System.Collections.Generic;
using System.ComponentModel;
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
using System.Windows.Shapes;

namespace SpraywallTemplateAnalyzer {
   /// <summary>
   /// Interaction logic for ModelTuneWindow.xaml
   /// </summary>
   public partial class ModelTuneWindow : Window, INotifyPropertyChanged {
      private uint maxSize = 400;
      private uint minArea = 164;
      private uint maxRatio = 4;
      private uint centerOffset = 5;
      private uint sizeThreshold = 10;

      public uint MaxSize { 
         get => maxSize;
         set {
            maxSize = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(MaxSize)));
         }
      }
      public uint MinArea { 
         get => minArea;
         set {
            minArea = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(MinArea)));
         }
      }
      public uint MaxRatio { 
         get => maxRatio;
         set {
            maxRatio = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(MaxRatio)));
         }
      }
      public uint CenterOffset {
         get => centerOffset;
         set {
            centerOffset = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(CenterOffset)));
         }
      }
      public uint SizeThreshold {
         get => sizeThreshold;
         set {
            sizeThreshold = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(SizeThreshold)));
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
   }
}
