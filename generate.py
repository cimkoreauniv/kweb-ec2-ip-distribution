import json
import csv

readFile = open('data.csv', encoding='euc-kr')
writeFile = open('data.json', encoding='utf-8', mode='wt')

r = csv.reader(open('data.csv'))

object = {}

for name, number, ip in r:
    if not name or not number:
        continue
    object[number] = {'ip': ip, 'name': name}

writeFile.write(json.dumps(object, ensure_ascii=False))

readFile.close()
writeFile.close()