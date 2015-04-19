%def head():
    <link rel="stylesheet" href="static/css/hist.css" />
    <script src="static/d3.v2.min.js"></script>
    <script src="static/hist.js"></script>
    <script src="static/index.js"></script>
%end

<h2>Preprocessamento dos dados</h2>
<ol>
    <!--li>Download das decisões</li>
    <li>Remoção do html</li>
    <li>Tokenization</li>
    <li>Armazenamento no MongoDB</li-->
    <li>Buscar decisões no MongoDB</li>
    <li>Para cada decisão, retornar lista de posições normalizadas</li>
    <li>Criar lista de posições
    <!--pre><code>var values = decisions.reduce(function(x,y){
     var positions = x.positions || x;
     return positions.concat(y.positions);
});</code>
</pre--></li>
</ol>

<hr />

<h2>Onde estão as palavras chave das decisões?</h2>
<form name="search" action="where-is" class="well">
<fieldset>
    <legend>Busca</legend>
    <!--label for='q'>Palavra chave</label-->
    <input type="text" name="q" />
    <!--input type="submit" class="btn icon-search" value='' /-->
    <button type="submit" class="btn"><i class="icon-search"></i></button>
     <span class="help-block">Exemplos de palavra chave: 'voto', 'provimento', 'favorável', 'negado'.</span>
</fieldset>
</form>
<div id="histogram">
</div>

<div id="decisions">
</div>

<hr />

<h2>References</h2>
<p> <a href="http://bl.ocks.org/mbostock/3048450">Histogram</a> </p>
<p> <a href="https://github.com/gajus/interdependent-interactive-histograms">Interdependent interactive histograms</a> </p>
<p> <a href="http://bl.ocks.org/mbostock/1667367">Focus+Context via Brushing</a> </p>
<p> <a href="http://stanford.edu/~garylee/bibly/">Bibly</a> </p>

<h2>ToDo</h2>
<p>Suport keyphrases search</p>
<p>Highlight search in result</p>
<p>Do not require js to search and plot, just for brush</p>
<p>Make search faster</p>
<p>Use 'loading' gif, like <a href="http://bootstrap.templatestock.net/html/kumaon/">this one</a>, during expensive requests</p>

%rebase layout head=head
