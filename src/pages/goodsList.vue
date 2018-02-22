<template>
    <div>
        <el-table
            :data="filterTableData"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="食品类别">
                            <span>{{ props.row.categoryName }}</span>
                        </el-form-item>
                        <el-form-item label="食品名称">
                            <span>{{ props.row.cnName }}</span>
                        </el-form-item>

                        <el-form-item label="优惠价">
                            <span>{{ props.row.memberShipPrice }}</span>
                        </el-form-item>
                        <el-form-item label="原价">
                            <span>{{ props.row.marketPrice }}</span>
                        </el-form-item>
                        <el-form-item label="食品单位">
                            <span>{{ props.row.menuUnitName }}</span>
                        </el-form-item>
                        <el-form-item label="食品简介">
                            <span>{{ props.row.cnInfo }}</span>
                        </el-form-item>
                        <el-form-item label="图片地址">
                            <span>{{ props.row.picture }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                prop="categoryName"
                label="食品类别"
                width="120"
                :filters="filterCategoryList"
                :filter-method="filterList"
                :filter-multiple="false"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                        type="primary"
                        close-transition>{{scope.row.categoryName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="食品名称"
                prop="cnName">
            </el-table-column>
            <el-table-column
                label="图片" width="100" >
                <template slot-scope="scope">
                    <img :src="scope.row.picture" width="64" style="margin-top: 7px" alt="">
                </template>
            </el-table-column>
            <el-table-column
                label="食品简介"
                prop="cnInfo">
            </el-table-column>
            <el-table-column
                label="优惠价"
                prop="memberShipPrice">
            </el-table-column>
            <el-table-column
                label="原价"
                prop="marketPrice">
            </el-table-column>
            <el-table-column
                label="食品单位"
                prop="menuUnitName">
            </el-table-column>
            <el-table-column
                label="支付单位"
                prop="priceUnitName">
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="食品状态" >
                    <el-col :span="6">
                        <el-select v-model="form.status" placeholder="请选择状态">
                            <el-option v-for="item in status" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8" style="text-align: right;padding-right: 10px;">
                        是否显示（移动端）
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="form.isUse" placeholder="是否显示">
                            <el-option v-for="item in isUse" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="食品类别" >
                    <el-select v-model="form.catId" placeholder="请选择类别">
                        <el-option v-for="item in categoryList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="食品名称" >
                    <el-col :span="6">
                        <el-input v-model="form.cnName" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="6" style="text-align: right;padding-right: 10px;">
                        食品单位
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="form.menuUnitId" placeholder="请选择类别">
                            <el-option v-for="item in menuUnits" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="食品现价" >
                    <el-col :span="5">
                        <el-input v-model="form.memberShipPrice" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="4" style="text-align: right;padding-right: 10px;">
                        原价
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="form.marketPrice" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="4" style="text-align: right;padding-right: 10px;">
                        单位
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="form.priceUnitId" placeholder="请选择类别">
                            <el-option v-for="item in priceUnits" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="食品简介">
                    <el-input v-model="form.cnInfo"></el-input>
                </el-form-item>
                <el-form-item label="上传食品图片">
                    <label class="goods__add-btn">
                        <input type="file" @change="setFoodImg" style="width: 0;height: 0;opacity: 0" >
                        <img class="goods__add-img"  :src="baseUrl + form.picture" alt="菜品图片">
                    </label>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateGoods">确 定</el-button>
            </div>
        </el-dialog>
        <div class="list__pagination">
            <el-pagination
                @size-change=""
                @current-change="handleCurrentChange"
                :current-page="page.pageNo"
                :page-size="page.pageSize"
                layout="total, prev, pager, next"
                :total="page.totalSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { dataURItoBlob } from 'src/common/utils/utils.js'
    import { proxyError, getInitData, getGoodsList, getGoodsListByCategory, updateGoods, deleteGoods, upFiles } from 'api'
    export default {
        data() {
            return {
                baseUrl: window.config.DOMAIN,
                dialogFormVisible: false,
                form: {
                    id: '',
                    catId: '',
                    cnName: '',
                    menuUnitId:'',
                    priceUnitId: '',
                    memberShipPrice: null,
                    marketPrice: null,
                    cnInfo: '',
                    picture: '',
                    isUse: 1,
                    status: 1
                },
                tableData: [],
                page: {
                    pageNo: 1,
                    pageSize: 5,
                    totalSize: 0,
                    keyword: null,
                    catId: null
                },
                categoryList: [],
                menuUnits: [],
                priceUnits: [],
                isUse:[{
                    text: '显示',
                    value: 1
                },{
                    text: '隐藏',
                    value: 0
                }],
                status:[{
                    text: '未售完',
                    value: 1
                },{
                    text: '已售完',
                    value: 2
                }]
            }
        },
        created() {
            this.getInitData()
            this.getGoodsList()
        },
        computed: {
            filterTableData(){
                for(let i=0,len=this.tableData.length; i<len; i++){
                    this.tableData[i].picture = window.config.DOMAIN + this.tableData[i].picture
                }
                return this.tableData
            },
            filterCategoryList() {
                let res = []
                for(let i=0,len=this.categoryList.length; i<len; i++){
                    let json = {}
                    json.text = this.categoryList[i].name
                    json.value = this.categoryList[i].id
                    res.push(json)
                }
                return res
            }
        },
        methods: {
            async updateGoods() {
                let result = await proxyError(updateGoods(this.form));
                if(result.data.code === window.config.STATE_OK){
                    this.dialogFormVisible = false
                    this.getGoodsList()
                }else{
                    this.$message({
                        type: 'error',
                        message: result.data.msg
                    });
                }
            },
            filterList(value, row) {
                console.log(value,row)
                if(value === ''){
                    this.page.pageNo = 1
                    this.page.catId = null
                    this.getGoodsList()
                }else{
                    this.page.pageNo = 1
                    this.page.catId = value
                    this.getGoodsList()
                }
                return true
            },
            async getInitData() {
                let result = await proxyError(getInitData());
                console.log(result)
                if (result.data.code === window.config.STATE_OK) {
                    this.categoryList = result.data.data.categorys
                    this.menuUnits = result.data.data.menuUnits
                    this.priceUnits = result.data.data.priceUnits
                }else{
                    console.log(result)
                }
            },
            async getGoodsList() {
                let res = await proxyError( getGoodsList({
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                    param: {
                        keyword: this.page.keyword,
                        catId: this.page.catId
                    }
                }) )
                if(res.data.code === window.config.STATE_OK){
                    this.tableData = res.data.data.currentPageData
                    this.page.pageNo = res.data.data.pageNo
                    this.page.pageSize = res.data.data.pageSize
                    this.page.totalSize = res.data.data.totalSize
                }
                console.log(res)
            },
            handleCurrentChange(val) {
                this.page.pageNo = val
                this.getGoodsList()

            },
            handleEdit(index,row){
                console.log(row)
                this.form.id = row.id
                this.form.catId = row.catId
                this.form.cnName = row.cnName
                this.form.menuUnitId = row.menuUnitId
                this.form.priceUnitId = row.priceUnitId
                this.form.memberShipPrice = row.memberShipPrice
                this.form.marketPrice = row.marketPrice
                this.form.cnInfo = row.cnInfo
                this.form.picture = row.picture.replace(window.config.DOMAIN,'')
                this.dialogFormVisible = true

            },
            handleDelete(index,row){
                this.$confirm('确认删除这道菜吗，如果只是不想在移动端显示，可以在编辑里设置隐藏?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteGoods({
                        id: row.id
                    }).then((result) =>{
                        if(result.data.code === window.config.STATE_OK){
                            this.getGoodsList()
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
            setFoodImg(e) {
                let _this = this
                let file = e.target.files[0]
                let reader = new FileReader();
                reader.addEventListener('load',function () {
                    _this.$cropper({
                        img: reader.result,
                        imageType: 'jpeg',
                        callback(img) {
                            var formData = new FormData();
                            formData.append("file",dataURItoBlob(img),"image.jpeg")
                            upFiles(formData,'?type=goods').then(function (res) {
                                if(res.data.code === window.config.STATE_OK){
                                    _this.$message({
                                        message: '上传成功',
                                        type: 'success'
                                    });
                                    _this.form.picture = res.data.data[0].saveFile
                                    _this.form.smallPicture = res.data.data[0].smallPicture
                                }
                            })
                        }
                    })

                },false)
                reader.readAsDataURL(file)
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
