function submitForm(event) {
  event.preventDefault();

  var xhr = new XMLHttpRequest();
  var url = "http://162.43.30.199:80/api";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  var data = JSON.stringify({ "content": document.getElementById('content').value });

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response)
      document.getElementById('response').innerHTML = response.mondaibun;
    }
  };
  
  xhr.send(data);
}
