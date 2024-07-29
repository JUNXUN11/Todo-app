<template>
  <div class="about">
    <div class="content">
      <h1>About Page</h1>
      <p>Welcome to the todo app! Here is a about page of this app</p>
    </div>
  </div>
</template>

<script setup>

</script>



<style mounted>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.about {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin: 0;
}

.content {
  background: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #1f2937;
}

p {
  font-size: 1.25rem;
  color: #4b5563;
  line-height: 1.6;
}

@media (min-width: 1024px) {
  .content {
    padding: 60px;
  }

  h1 {
    font-size: 3rem;
  }

  p {
    font-size: 1.5rem;
  }
}
</style>
