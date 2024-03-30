using Emgu.CV.Structure;
using System.ComponentModel;
using System.Windows.Media;

namespace SpraywallTemplateAnalyzer.Models {
   public class SelectableRotatedRect : INotifyPropertyChanged {
      private bool isSelected;
      private Color color;

      public RotatedRect RotatedRect { get; set; }

      public bool IsSelected { 
         get => isSelected; 
         set { 
            isSelected = value; 
            if (PropertyChanged != null) {
               PropertyChanged.Invoke(this, new PropertyChangedEventArgs(nameof(IsSelected)));
            }
         } 
      }

      public Color Color { 
         get => color;
         set {
            color = value;
            if (PropertyChanged != null) {
               PropertyChanged.Invoke(this, new PropertyChangedEventArgs(nameof(Color)));
            }
         } 
      }

      public event PropertyChangedEventHandler? PropertyChanged;
   }
}
