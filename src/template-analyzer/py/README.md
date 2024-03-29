# shape-detection-python

## Steps to run Code

This section describes how to run the code

### Python setup

``` pwsh
# Navigate to the python scripts folder
cd spraywall\src\template-analyzer\py

# Upgrade pip
pip install --upgrade pip

# Install requirements
pip install -r requirements.txt
```

### Run

``` pwsh
python .\hough_emug.py .\20240313_184427-EDIT.jpg
```

### Point within ellipse

Ellipse = (h, k), (2rx, 2ry), a

(x - h)^2/rx^2 + (y - k)^2/ry^2 <= 1

Coordinate transform - (x, y), a -> (x', y')

x' = x*cos(a) + y*sin(a)
y' = y*cos(a) - x*sin(a)