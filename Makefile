all: src/* template/*
	build/update_post.py
	build/update_index.py

.PHONY : clean
clean:
	-rm posts/*
	-rm index.html

