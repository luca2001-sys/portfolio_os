import os
import glob

files = glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True)

for file in files:
    if "ProjectComponents" in file or "components\\UI" in file or "components/UI" in file:
        continue

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content.replace("from '../ProjectComponents'", "from '../components/UI'")
    new_content = new_content.replace('from "../ProjectComponents"', 'from "../components/UI"')
    new_content = new_content.replace("from '../../ProjectComponents'", "from '../../components/UI'")
    new_content = new_content.replace('from "../../ProjectComponents"', 'from "../../components/UI"')
    new_content = new_content.replace("from './ProjectComponents'", "from './components/UI'")
    new_content = new_content.replace('from "./ProjectComponents"', 'from "./components/UI"')

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated:", file)
