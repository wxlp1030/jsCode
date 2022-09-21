<script>
import axios from 'axios'
export default {
    name: 'hello',
    methods: {
        getData() {
            axios.post("http://127.0.0.1:8081/kaifamiao/kfm/list").then(data => {
                this.messages = data.data.rows;
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then((_) => {
                    done();
                    this.formData = []
                })
                .catch((_) => { })
        },
        to_submit() {
            axios({
                method: "POST",
                url: 'http://localhost:8081/kaifamiao/kfm/add',
                data: JSON.stringify(this.formData),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }).then(data => {
                if (data.status == 200) {
                    this.dialogVisible = false;
                    this.formData = {
                        username: '',
                        password: '',
                        content: ''
                    };
                    this.getData();
                }
            })
        },
        to_delete(id) {
            axios({
                method: "POST",
                url: 'http://localhost:8081/kaifamiao/kfm/remove',
                data: {'ids': id},
            }).then(data => {
                if (data.status == 200) {
                    this.getData();
                }
            })
        }

    },
    data() {
        return {
            messages: [],
            dialogVisible: false,
            tips: '新增数据',
            formData: {
                username: '',
                password: '',
                content: ''
            }
        }
    },
    mounted() {
        this.getData()
    }

}
</script>
    
<template>
    <el-button @click="dialogVisible = true">留言</el-button>
    <el-scrollbar height="400px">
        <p v-for="item in messages" :key="item" class="scrollbar-demo-item">{{ item.username }}：{{ item.content }}
            {{ item.createDate }}<el-button @click="to_delete(item.id)">删除</el-button></p>
    </el-scrollbar>

    <el-dialog v-model="dialogVisible" :title="tips" width="30%" :before-close="handleClose">
        <el-form ref="form" :model="formData" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label=" 密码">
                <el-input v-model="formData.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label=" 内容">
                <el-input v-model="formData.content" type="textarea"></el-input>
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="to_submit()">Confirm</el-button>
            </span>
        </template>
    </el-dialog>



</template>

<style scoped>
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
</style>