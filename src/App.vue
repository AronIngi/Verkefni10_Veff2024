<template id="app">
  <main class="weather">
    <h1>Veðurspá</h1>
    <h2>Sláðu inn nafn á borg inn í textareitinn hér að neðan.</h2>
    <form class="search-form">
      <input type="button" value="My Location" class="my-location" />
      <input type="text" class="search_bar" />
      <select class="temp_unit">
        <option>Celsius</option>
        <option>Fahrenheit</option>
      </select>
      <select class="prec_unit">
        <option>mm</option>
        <option>Inch</option>
      </select>
      <input type="submit" value="Leita" class="submitter" />
    </form>
    <h3 class="table-heading"></h3>
  </main>
</template>
