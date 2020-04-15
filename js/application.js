var sum = function (acc, x) { return acc + x; };

var getSubTotal = function (ele) {
  var unitPrice = parseFloat($(ele).find('.unit input').val());
  var numUnit = parseFloat($(ele).find('.num input').val());

  var subAmount = unitPrice * numUnit;
  $(ele).children('.amount').html(subAmount);

  return subAmount;
}

var updatedPrice = function () {
  var subTotal = [];

  $('tbody tr').each(function (i, ele) {
    var subAmount = getSubTotal(ele);
    subTotal.push(subAmount);
  });

  var totalValue = subTotal.reduce(sum);

  $('#totalAmount').html(totalValue);
}

$(document).ready(function () {
  updatedPrice();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updatedPrice();
  });

  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var unit = $(this).children('[name=unit]').val();
    var num = $(this).children('[name=num]').val();

    $('tbody').append('<tr>' +
      '<td class="name">' + name + '</td>' +
      '<td class="unit"><input type="number" value="' + unit + '" /></td>' +
      '<td class="num"><input type="number" value="' + num + '" /></td>' +
      '<td class="amount"></td>' +
      '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
    '</tr>');

    updatedPrice();
    $(this).children('[name=name]').val('');
    $(this).children('[name=unit]').val('');
    $(this).children('[name=num]').val('');
  });
});
