import re
import io
#
#
#
#put file-name to originFile:
#
originFile1 = 'with_accents.txt'
originFile2 = 'kurzbeispiel.txt'
exitFile = str('xmlified2_'+originFile1)
speaker1 = "ew"
speaker2= "rr"
segmentsE = []
segmentsR = []
textArray = []


'''
REGEX
for intervals: intervals\s\[\d+]:
for xmin: \s+xmin\s=\s\d+\.\d{6}
for xmax: \s+xmax\s=\s\d+.\d{6}
for text: \s+text\s=\s\"[!-~]*\"
'''



#open webmouse-transcript from same directory as jsonify.py
with io.open(originFile1, 'r', encoding ='utf-8') as gr, io.open(originFile2, 'r', encoding='utf-8') as tr:
    rawData = gr.read()
    speakerSegmentation = tr.readlines()
    for l in speakerSegmentation:
        line = l.strip('\n')
        if(line !=''):
            textArray.append(line)



'''
    speaker1occurences = re.findall(r'E\s:\s.+', speakerSegmentation)
    speaker2occurences = re.findall(r'R\s:\s.+', speakerSegmentation)
'''


#all functions concerning the word-timeline
cutHeader = re.findall(r'intervals\s\[\d+]:\s+xmin\s=\s\d+\.\d{6}\s+xmax\s=\s\d+.\d{6}\s+text\s=\s".+', rawData)
rawData = str(cutHeader)


#cut "intervals" from single segments + extract audioinformation for further processing
intervals = re.findall(r'intervals\s\[\d+]:', rawData)
xmins = re.findall(r'xmin\s=\s\d+\.\d{6}', rawData)
xmaxs = re.findall(r'xmax\s=\s\d+.\d{6}', rawData)
transcripts = re.findall(r'text\s=\s\".*?\"', rawData, re.UNICODE)



#process single segments to match samplejson structure
x = 0
transcriptArray = []
for eachInterval in intervals:
    start = str(str(xmins[x])).replace('0000', '').replace('xmin = ', '')
    start = 'start' + '="' + start + '"'
    end = str(xmaxs[x]).replace('0000', '')
    end = 'end' + '="' + end.replace('xmax = ', '') + '"'
    text = str(transcripts[x]).replace('"', '')
    text = text.replace('text = ', '')


    finalSegmentInformation = ""
    if(text != ''):
        finalSegmentInformation = str('<item>' + '\n' + '<u ' + start + ' ' + end + '>' + text + '</u>'+ '\n' + '<gloss></gloss>'+ '\n' + '<term xml:lang="fr"></term>' + '\n' + '</item>' + '\n')

    # write segmentsdata to outputfile
    with open(exitFile, 'a') as wf:
     if((x+1) == len(intervals)):
         wf.write(str(finalSegmentInformation))
     else:
         wf.write(str(finalSegmentInformation))
    x += 1


    with open(exitFile, 'r') as rf:
        xmlFile = rf.readlines();
        for line in xmlFile:
            print(line)








