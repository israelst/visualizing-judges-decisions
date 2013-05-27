%def head():
    <link rel="stylesheet" href="static/css/hist.css" />
    <!--script src="http://d3js.org/d3.v2.min.js?2.10.0"></script-->
    <script src="static/d3.v2.min.js"></script>
    <script src="static/hist.js"></script>
    <script>
        $(document).ready(function(){
            $(document.forms.search).submit(function() {
                $('#histogram').empty()
                d3.json('where-is?q=' + this.q.value, hist);
                return false;
            });
        });
    </script>
%end

<p> <a href="http://bl.ocks.org/mbostock/3048450">referece</a> </p>
<p>Replace y axis to percentege</p>

<form name="search" action="where-is" class="well">
    <input type="text" name="q" />
    <input type="submit" class="btn icon-search" value='' />
</form>
<div id="histogram">
</div>

%rebase layout head=head
