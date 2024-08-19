<template>
    <div class="about-container">
        <div class="overlay">
            <div class="content">
                <h1>Welcome to Greenwich University</h1>
                <p>Greenwich University is the top institution for higher education, providing world-class education and
                    research opportunities.</p>
                <p>Email: <a href="mailto:abcxyz.123456@mail.com">abcxyz.123456@mail.com</a></p>
                <p>Hotline: 555-555-555</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
};
</script>

<style scoped>
.about-container {
    position: relative;
    height: 100vh;
    background-image: url('../assets/greenwich.png');
    /* Replace with your image path */
    background-size: cover;
    background-position: center;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    /* Dark overlay */
    display: flex;
    justify-content: center;
    align-items: top;
}

.content {
    color: white;
    text-align: center;
    max-width: 600px;
}

h1 {
    font-size: 4.3rem;
    margin-bottom: 20px;
}

p {
    font-size: 1.5rem;
    margin-bottom: 10px;
}
</style>