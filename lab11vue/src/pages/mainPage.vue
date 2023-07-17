
<style>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    white-space: nowrap;
}

.layout-footer-center {
    text-align: center;
}

.dev-run-preview .dev-run-preview-edit {
    display: none
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{ position: 'fixed', width: '100%' }">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                        <Icon type="md-contact"></Icon>
                        <Button type="text" ghost @click="setType('showFindOneForm')">查詢單一會員</Button>
                        <!--findOne /-->
                        </MenuItem>
                        <MenuItem name="2">
                        <Icon type="md-contacts"></Icon>
                        <Button type="text" ghost @click="findAll">查詢所有會員</Button>
                        <!--findAll /-->
                        </MenuItem>
                        <MenuItem name="3">
                        <Icon type="md-add"></Icon>
                        <Button type="text" ghost @click="setType('showAddMemberForm')">新增會員</Button>
                        <!--addMember /-->
                        </MenuItem>
                        <MenuItem name="4">
                        <Icon type="md-arrow-up"></Icon>
                        <Button type="text" ghost @click="setType('showUpdateMemberForm')">修改會員資料</Button>
                        <!--updateMember /-->
                        </MenuItem>
                        <MenuItem name="5">
                        <Icon type="md-backspace"></Icon>
                        <Button type="text" ghost @click="setType('showDeleteMemberForm')">刪除會員資料</Button>
                        <!--deleteMember /-->
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{ margin: '88px 20px 0', background: '#fff', minHeight: '500px' }">
                
                <div v-if="type === 'showFindOneForm'">
                    <h2>查詢單一會員</h2>
                    <input type="text" v-model="uidValue" placeholder="會員編號">>
                    <br>
                    <Button type="primary" @click="findOne">送出</Button>
                    <br>
                    <p>{{ findOneMessage }}</p>
                </div>
                <div v-if="type === 'allMembers'">
                    <h2>查詢會員</h2>
                    <p>{{ findAllMessage }}</p>
                    <div id="memberContainer">
                        <div v-for="member in members" :key="member.uid">
                            <p>UID: {{ member.uid }}, Name: {{ member.name }}, Phone: {{ member.phone }}</p>
                            <hr>
                        </div>
                    </div>
                </div>
                <div v-if="type === 'showAddMemberForm'">
                    <h2>新增會員</h2>
                    <input type="text" v-model="newMember.uid" placeholder="會員編號">
                    <br>
                    <input type="text" v-model="newMember.name" placeholder="會員姓名">
                    <br>
                    <input type="text" v-model="newMember.phone" placeholder="會員電話">
                    <br>
                    <Button type="primary" @click="submitAddMember">送出</Button>
                    <br>
                    <p>{{ addMemberMessage }}</p>
                </div>
                <div v-if="type === 'showUpdateMemberForm'">
                    <h2>修改會員資料</h2>
                    <input type="text" v-model="updateMember.uid" placeholder="會員編號">
                    <br>
                    <input type="text" v-model="updateMember.name" placeholder="會員姓名">
                    <br>
                    <input type="text" v-model="updateMember.phone" placeholder="會員電話">
                    <br>
                    <Button type="primary" @click="submitUpdateMember">送出</Button>
                    <br>
                    <p>{{ updateMemberMessage }}</p>
                </div>
                <div v-if="type === 'showDeleteMemberForm'">
                    <h2>刪除會員</h2>
                    <input type="text" v-model="deleteUid" placeholder="會員編號">
                    <br>
                    <Button type="primary" @click="deleteMember">送出</Button>
                    <br>
                    <p>{{ deleteMemberMessage }}</p>
                </div>
            </Content>
            <Footer class="layout-footer-center">2011-2023 &copy; View Design</Footer>
        </Layout>
    </div>
</template>
<script>
//import findOne from '../components/findOne.vue'
//import findAll from '../components/findAll.vue'
//import addMember from '../components/addMember.vue'
//import updateMember from '../components/updateMember.vue'
//import deleteMember from '../components/deleteMember.vue'
export default {
    components: {
        //findOne,
        //findAll,
        //addMember,
        //updateMember,
        //deleteMember
    },
    data() {
        return {
            type: 'false',
            findOneMessage: '',
            findAllMessage: '',
            addMemberMessage: '',
            newMember: {
                uid: '',
                name: '',
                phone: ''
            },
            updateMemberMessage: '',
            updateMember: {
                uid: '',
                name: '',
                phone: ''
            },
            deleteMemberMessage: ''

        };
    },
    methods: {
        setType(newType) {
            this.type = newType;
        },
        async findOne() {
            const response = await fetch(`http://localhost:3001/api/member/${this.uidValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const result = await response.json();
            if (response.ok) {
                this.findOneMessage = `會員${this.uidValue}:姓名:${result.name},電話:${result.phone}`;
            } else {
                this.findOneMessage = `查詢失敗:${result.error}`;
            }
        },
        async findAll() {
            this.setType('allMembers');
            const response = await fetch('http://localhost:3001/api/member', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const result = await response.json();
            if (response.ok) {
                this.findAllMessage = `現有會員:`;
                this.members = result;
            } else {
                this.findAllMessage = `查詢會員失敗:`;
            }
        },
        async submitAddMember() {
            const response = await fetch('http://localhost:3001/api/member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newMember)
            });
            const result = await response.json();
            if (response.ok) {
                this.addMemberMessage = `新增會員成功: ${result.insertedId}`;
            } else {
                this.addMemberMessage = `新增會員失敗: ${result.error}`;
            }
        },
        async submitUpdateMember() {
            const response = await fetch('http://localhost:3001/api/member', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.updateMember)
            });
            const result = await response.json();
            if (response.ok) {
                this.updateMemberMessage = `修改會員${this.updateMember.uid}資料成功`;
            } else {
                this.aupdateMemberMessage = `修改會員資料失敗: ${result.error}`;
            }
        },
        async deleteMember() {
            const response = await fetch(`http://localhost:3001/api/member/${this.deleteUid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const result = await response.json();
            if (response.ok) {
                this.deleteMemberMessage = `會員${this.deleteUid}已成功刪除`;
            } else {
                this.deleteMemberMessage = `刪除失敗:${result.error}`;
            }
        }
    }
};
</script>