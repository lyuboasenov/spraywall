"""
@file hough_lines.py
@brief This program demonstrates line finding with the Hough transform
"""
import sys
import math
import cv2 as cv
import numpy as np
import random
import json
import base64

title_window = 'Wall template'
max_max_size_threshold = 999
max_min_area_threshold = 500
max_ratio = 200

_max_size_threshold = 400
_min_area_threshold = 200
_ratio = 20

_ellipses = list()
_rectangles = list()

_filename = ''
_show_invalid = False

def valid_size(width, height):
   return width < _max_size_threshold and height < _max_size_threshold

def valid_area(width, height):
   return width * height > _min_area_threshold

def valid_ratio(width, height):
   if width == 0 or height == 0:
      return False

   return width / height < _ratio if width > height else height / width < _ratio

def redraw_img(filename):
   colorImg = cv.imread(cv.samples.findFile(filename), cv.IMREAD_COLOR)

   for el in _ellipses:
      _, (width, height), _ = el
      color = (0, 255, 255)

      if not valid_size(width, height):
         color = (0, 0, 255)
         if not _show_invalid:
            continue
      elif not valid_area(width, height):
         color = (255, 0, 0)
         if not _show_invalid:
            continue
      elif not valid_ratio(width, height):
         color = (0, 255, 0)
         if not _show_invalid:
            continue

      cv.ellipse(colorImg, el, color, 2)

   cv.imshow(title_window, colorImg)

def on_threshold_trackbar(val):
   global _max_size_threshold
   _max_size_threshold = val
   redraw_img(_filename)

def on_area_trackbar(val):
   global _min_area_threshold
   _min_area_threshold = val
   redraw_img(_filename)

def on_ratio_trackbar(val):
   global _ratio
   _ratio = val
   redraw_img(_filename)

def preprocess(src):
   blurred = cv.GaussianBlur(src, (5, 5), 1)
   dst = cv.Canny(blurred, 180, 120)

   contours, _ = cv.findContours(dst, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

   for contour in contours:
      rect = cv.minAreaRect(contour)
      (x, y), (width, height), angle = rect

      if width > 0 and height > 10:
         if len(contour) > 4:
            ellipse = cv.fitEllipse(contour)
            _ellipses.append(ellipse)
         else:
            _rectangles.append(rect)

def export(img):
   ellipsesArray = []
   for el in _ellipses:
      (x, y), (width, height), angle = el
      if valid_size(width, height) and valid_area(width, height) and valid_ratio(width, height):
         ellipsesArray.append(((x, y), (width, height), angle))

   _, img_data = cv.imencode('.JPG', img)
   json_str = json.dumps({"ellipses": ellipsesArray, "image": base64.b64encode(img_data).decode('ascii')}, indent = 2)
   open("export.json", "w").write(json_str)

def main(argv):

   default_file = 'wall.jpg'
   global _filename
   global _filename
   global _filename
   _filename = argv[0] if len(argv) > 0 else default_file

   # Loads an image
   src = cv.imread(cv.samples.findFile(_filename), cv.IMREAD_GRAYSCALE)
   # Check if image is loaded fine
   if src is None:
      print ('Error opening image!')
      print ('Usage: extract_template.py [image_name -- default ' + default_file + '] \n')
      return exit(0)

   preprocess(src)

   cv.namedWindow(title_window)

   threshold_trackbar_name = 'Size x %d' % max_max_size_threshold
   cv.createTrackbar(threshold_trackbar_name, title_window , 400, max_max_size_threshold, on_threshold_trackbar)

   area_trackbar_name = 'Area x %d' % max_min_area_threshold
   cv.createTrackbar(area_trackbar_name, title_window , 200, max_min_area_threshold, on_area_trackbar)

   ratio_trackbar_name = 'Ratio x %d' % max_ratio
   cv.createTrackbar(ratio_trackbar_name, title_window , 20, max_ratio, on_ratio_trackbar)

   redraw_img(_filename)

   cv.waitKey()
   return 0

if __name__ == "__main__":
   main(sys.argv[1:])