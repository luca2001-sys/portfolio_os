import sys
import glob

# Fix App.tsx unused imports
with open('src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "./ProjectComponents";', 'import { IntroBlock } from "./ProjectComponents";')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

# Fix Project*.tsx unused React imports
for file in glob.glob('src/projects/Project*.tsx'):
    with open(file, 'r', encoding='utf-8') as f:
        p_text = f.read()
    
    p_text = p_text.replace('import React from "react";\n', '')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(p_text)
