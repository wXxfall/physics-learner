# show_matrix.py
import numpy as np

def print_matrix(arr):
    """以矩阵风格打印 NumPy 数组"""
    if arr.ndim != 2:
        print("仅支持二维数组")
        return
    
    # 计算每个元素的最大宽度
    max_width = max(len(f"{x:.4f}") for row in arr for x in row)
    
    # 打印顶部边框
    print("┌" + "─" * (max_width + 2) * arr.shape[1] + "┐")
    
    # 打印每行
    for i, row in enumerate(arr):
        line = "│"
        for val in row:
            line += f" {val:.4f} ".rjust(max_width + 2)
        line += "│"
        print(line)
    
    # 打印底部边框
    print("└" + "─" * (max_width + 2) * arr.shape[1] + "┘")

