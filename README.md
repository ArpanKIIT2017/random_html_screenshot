To run the project, it is assumed that node >= 10.5 already configured
    $ mkdir imgs pages
    $ npm install
    $ node main.py <sample_size> <no_of_worker_threads>

Using insanely large number of worker processes would actually slow things down and only fuck your system effectively. The more the worker processes more the number of chrome browsers you are opening under the hood.

If you want to run only single thread

    $ node gen_dataset.js <start> <end>

HTML pages are located pages/ directory as page<1..>.html with respective screenshots in imgs/ directory as img<1..>.png
    
