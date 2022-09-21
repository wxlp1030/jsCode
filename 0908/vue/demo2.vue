<template>

    <h1>测试2</h1>
    <div>
        {{username}}
    </div>
    <Demo1></Demo1>

</template>

<script>
import Demo1 from './demo1.vue';
export default {
    name: 'demo2',
    components: {
        Demo1
    },
    data() {
        return {
            username: "父组件"
        }
    }
}

</script>