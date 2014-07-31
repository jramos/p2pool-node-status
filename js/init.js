var node_address_link = "";

$(document).ready(function() {
  $(document).trigger('init');

  // load header and footer
  if(config.header_url && config.header_url.length > 0) {
    $("#header").load(config.header_url);
  }
  if(config.footer_url && config.footer_url.length > 0) {
    $("#footer").load(config.footer_url);
  }

  // set node name
  if (config.node_name) {
    $('#node').removeClass('hidden').text(config.node_name);
    $('#_node').removeClass('hidden');
  }

  // create donation address link
  if(config.donation_address && config.donation_address.length > 0) {
    node_address_link = $('<a/>')
      .attr('href', 'https://blockchain.info/address/' + config.donation_address)
      .attr('target', '_blank').text(config.donation_address);
  }

  // get the latest bitcoin price
  var dollar_per_bitcoin;
  if (config.convert_bitcoin_to_usd) {
    getLatestBitcoinPrice();

    $('button.to_usd').bind('click', function(event){
      if (this.className == 'to_btc') {
        bitcoin_amount = parseFloat(this.firstChild.dataset['value']);
        this.firstChild.innerHTML = bitcoin_amount + ' BTC';
        this.className = 'to_usd';
      } else {
        bitcoin_amount = parseFloat(this.firstChild.dataset['value']);
        bitcoin_in_usd = BTCToUSD(bitcoin_amount);
        this.firstChild.innerHTML = '$' + bitcoin_in_usd.toFixed(2) + ' USD';
        this.className = 'to_btc';
      }
    });
  }

  // set updated at
  var dts = $.format.date(new Date(), 'yyyy-MM-dd HH:mm:ss');
  $('#updated').text(dts);
});