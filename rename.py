# 将data/下所有子文件夹图片统一以5位数字命名
import os

img_dirs = ['./data/AF/', './data/ours/', './data/clean/']

for imgdir in img_dirs:
    imgs = os.listdir(imgdir)
    imgs.sort()
    for i in range(len(imgs)):
        os.renames(imgdir+imgs[i], imgdir+(5-len(str(i)))*'0'+str(i)+'.png')
