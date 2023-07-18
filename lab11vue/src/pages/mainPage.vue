
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
                        <router-link to="/find-one">
                            <Icon type="md-contact"></Icon>
                            <Button type="text" ghost >查詢單一會員</Button>
                        </router-link>
                        </MenuItem>
                        <MenuItem name="2">
                        <router-link to="/find-all">
                            <Icon type="md-contacts"></Icon>
                            <Button type="text" ghost >查詢所有會員</Button>
                        </router-link>
                        </MenuItem>
                        <MenuItem name="3">
                        <router-link to="/add-member">
                            <Icon type="md-add"></Icon>
                            <Button type="text" ghost >新增會員</Button>
                        </router-link>
                        </MenuItem>
                        <MenuItem name="4">
                        <router-link to="/update-member">
                            <Icon type="md-arrow-up"></Icon>
                            <Button type="text" ghost >修改會員資料</Button>
                        </router-link>
                        </MenuItem>
                        <MenuItem name="5">
                        <router-link to="/delete-member">
                            <Icon type="md-backspace"></Icon>
                            <Button type="text" ghost >刪除會員資料</Button>
                        </router-link>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{ margin: '88px 20px 0', background: '#fff', minHeight: '500px' }">
                <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">2011-2023 &copy; View Design</Footer>
        </Layout>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {    
        };
    },
};
</script>