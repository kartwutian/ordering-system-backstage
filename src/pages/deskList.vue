<template>
    <div>

        <el-table
            :data="filterTableData"
            style="width: 100%">
            <el-table-column
                label="餐桌号码"
                prop="deskNumber">
            </el-table-column>
            <el-table-column
                label="餐桌雅名"
                prop="deskName">
            </el-table-column>
            <el-table-column
                label="二维码" width="160">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleOpenView(scope.$index, scope.row)">查看</el-button>
                    <a class="el-button el-button--primary el-button--small" style="text-decoration: none;" :download="scope.row.deskMaterielPicture" :href="scope.row.deskMaterielPicture">下载</a>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加餐桌" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="餐桌号码" >
                    <el-col :span="6">
                        <el-input v-model="form.deskNumber" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="6" style="text-align: right;padding-right: 10px;">
                        餐桌雅名
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="form.deskName" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDesk">确 定</el-button>
            </div>
        </el-dialog>
        <el-row class="list__pagination" type="flex" justify="space-between">
            <el-button type="primary" round @click="handleEdit()">+添加餐桌</el-button>
            <el-pagination
                @size-change=""
                @current-change="handleCurrentChange"
                :current-page="page.pageNo"
                :page-size="page.pageSize"
                layout="total, prev, pager, next"
                :total="page.totalSize">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import { dataURItoBlob } from 'src/common/utils/utils.js'
    import { proxyError, getDeskList, addDesk, deleteDesk, upFiles } from 'api'
    export default {
        data() {
            return {
                baseUrl: window.config.DOMAIN,
                dialogFormVisible: false,
                form: {
                    deskNumber: null,
                    deskName: null
                },
                tableData: [],
                page: {
                    pageNo: 1,
                    pageSize: 5,
                    totalSize: 0,
                    keyword: null
                }
            }
        },
        created() {
            this.getDeskList()
        },
        computed: {
            filterTableData(){
                for(let i=0,len=this.tableData.length; i<len; i++){
                    if(this.tableData[i].deskMaterielPicture){
                        this.tableData[i].deskMaterielPicture = window.config.DOMAIN + this.tableData[i].deskMaterielPicture
                    }
                }
                return this.tableData
            },
        },
        methods: {
            async addDesk() {
                let result = await proxyError(addDesk(this.form));
                if(result.data.code === window.config.STATE_OK){
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'success',
                        message: result.data.msg
                    });
                    this.getDeskList()
                }else{
                    this.$message({
                        type: 'error',
                        message: result.data.msg
                    });
                }
            },
            async getDeskList() {
                let res = await proxyError( getDeskList({
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                    param: {
                        keyword: this.page.keyword
                    }
                }) )
                if(res.data.code === window.config.STATE_OK){
                    this.tableData = res.data.data.currentPageData
                    this.page.pageNo = res.data.data.pageNo
                    this.page.pageSize = res.data.data.pageSize
                    this.page.totalSize = res.data.data.totalSize
                }
                console.log(res)
                console.log(this.tableData)
            },

            handleEdit(){
                this.dialogFormVisible = true
            },
            async getQRCode(){

            },
            handleCurrentChange(val) {
                this.page.pageNo = val
                this.getDeskList()
            },
            handleDelete(index,row){
                this.$confirm('确认删除这张餐桌/包间吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDesk({
                        id: row.id
                    }).then((result) =>{
                        if(result.data.code === window.config.STATE_OK){
                            this.getDeskList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: result.data.msg
                            });
                        }
                    })
                    .catch((err)=>{
                        this.$message({
                            type: 'error',
                            message: '服务器出错啦！'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleOpenView(index,row){
                console.log(row)
                window.open(row.deskMaterielPicture)
            },
            handleDownload(index,row){
                console.log(row)
                var oForm = document.createElement('form')
                oForm.setAttribute('method','get')
                oForm.setAttribute('action',row.deskMaterielPicture)

                document.body.appendChild(oForm);
                //提交表单，实现下载
                oForm.submit();
            }

        }
    }
</script>

<style lang="less">
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-form-item__content{
        margin-left: 110px;
    }

    .list__pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
</style>
