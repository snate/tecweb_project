default: relazione.pdf

relazione.pdf: relazione.tex
	pdflatex -shell-escape relazione.tex
	pdflatex -shell-escape relazione.tex

clean:
	rm -f *.lot
	rm -f *.lof
	rm -f *.aux
	rm -f *.toc
	rm -f *.out
	rm -f *.log
	rm -f *.pdf
	rm sections/*.aux
	