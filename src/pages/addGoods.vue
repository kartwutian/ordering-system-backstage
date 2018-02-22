<template>
    <div>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				<header class="form_header">选择食品种类</header>
	  			<el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
		  			<el-row class="category_select">
		  				<el-form-item label="食品种类">
			  				<el-select v-model="categoryForm.categorySelect" style="width:100%;">
							    <el-option
							      	v-for="item in categoryForm.categoryList"
							      	:key="item.id"
							      	:label="item.name"
							      	:value="item.name">
							    </el-option>
						  	</el-select>
						</el-form-item>
					</el-row>
					<el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
						<div class="add_category">
							<el-form-item label="食品种类" prop="name">
								<el-input v-model="categoryForm.name"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click.native="submitCategoryForm('categoryForm')">提交</el-button>
								<el-button @click.native="cancelSubmitCategory()">取消</el-button>
							</el-form-item>
						</div>
					</el-row>
					<div class="add_category_button" @click="addCategoryFun">
						<i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
						<i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
						<span>添加食品种类</span>
					</div>
	  			</el-form>
                <template v-if="categoryForm.categorySelect" >
                    <header class="form_header">添加食品</header>
                    <el-form :model="foodForm" :rules="foodRules" ref="foodForm" label-width="110px" class="form food_form">
	  				<el-form-item label="食品名称" prop="name">
						<el-input v-model="foodForm.cnName"></el-input>
					</el-form-item>
					<el-form-item label="食品简介" prop="description">
						<el-input v-model="foodForm.cnInfo" placeholder="尽量控制20个文字以内"></el-input>
					</el-form-item>
					<el-form-item label="上传食品图片">
                        <label class="goods__add-btn">
                            <input type="file" @change="setFoodImg" style="width: 0;height: 0;opacity: 0" >
                            <img class="goods__add-img" v-if="foodForm.picture" :src="baseUrl + foodForm.picture" alt="">
                        </label>
					</el-form-item>

                    <el-form-item label="优惠价（元）">
                        <el-input-number v-model="foodForm.discountPrice" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="原价（元）">
                        <el-input-number v-model="foodForm.originPrice" :min="0" :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="食品单位">
                        <el-select v-model="foodForm.goodsUnit" placeholder="请选择">
                            <el-option
                                v-for="item in menuUnits"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付单位">
                        <el-select v-model="foodForm.priceUnitId" placeholder="请选择">
                            <el-option
                                v-for="item in priceUnits"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
						<el-button type="primary" @click="addFood('foodForm')">确认添加食品</el-button>
					</el-form-item>
	  			</el-form>
                </template>

            </el-col>
  		</el-row>
    </div>
</template>

<script>
    import { dataURItoBlob } from 'src/common/utils/utils.js'
    import { proxyError,getInitData,getCategoryList, addCategory, addGoods, upFiles } from 'api'


    export default {
    	data(){
    		return {
    		    baseUrl: window.config.DOMAIN,
                priceUnits: [],
                menuUnits: [],
                showAddCategory: false,
    			categoryForm: {
    				categoryList: [],
    				categorySelect: '',
    				name: '',
    			},
    			foodForm: {
                    cnName: '',
                    cnInfo: '',
                    picture: '',
                    smallPicture: '',
                    goodsUnit: '份',
                    discountPrice: null,
                    originPrice: null,
                    priceUnitId: '元'
                },
    			foodRules: {
    				cnName: [
						{ required: true, message: '请输入食品名称', trigger: 'blur' },
					],
    			}
    		}
    	},
    	created(){
    		/*if (this.$route.query.restaurant_id) {
    			this.restaurant_id = this.$route.query.restaurant_id;
    		}else{
    			this.restaurant_id = Math.ceil(Math.random()*10);
    			this.$msgbox({
		          title: '提示',
		          message: '添加食品需要选择一个商铺，先去就去选择商铺吗？',
		          showCancelButton: true,
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          beforeClose: (action, instance, done) => {
		            if (action === 'confirm') {
		              this.$router.push('/shopList');
		              done();
		            } else {
		            	this.$message({
				            type: 'info',
				            message: '取消'
				        });
		              	done();
		            }
		          }
		        })
    		}*/
    		this.initData();
    	},
    	methods: {
    	    filterCategoryId(name) {
    	        let catId = null
    	        this.categoryForm.categoryList.forEach(function (item) {
                    if(item.name === name){
                        catId = item.id
                    }
                })
                return catId
            },
    		async initData(){
                const result = await proxyError(getInitData());
                console.log(result)
                if (result.data.code == window.config.STATE_OK) {
                    this.categoryForm.categoryList = result.data.data.categorys
                    this.priceUnits = result.data.data.priceUnits
                    this.menuUnits = result.data.data.menuUnits
                }else{
                    console.log(result)
                }
    		},
		    addCategoryFun(){
		    	this.showAddCategory = !this.showAddCategory;
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
                                    _this.foodForm.picture = res.data.data[0].saveFile
                                    _this.foodForm.smallPicture = res.data.data[0].smallPicture
                                }
                            })
                        }
                    })

                },false)
                reader.readAsDataURL(file)
            },
            cancelSubmitCategory() {
                this.showAddCategory = false;
            },
		    submitCategoryForm(categoryForm) {
				this.$refs[categoryForm].validate(async (valid) => {
					if (valid) {
						const params = {
							name: this.categoryForm.name
						}
                        const result = await proxyError(addCategory(params)) ;
                        if (result.data.code === window.config.STATE_OK) {
                            this.initData();
                            this.categoryForm.name = '';
                            this.showAddCategory = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                        }else{
                            this.$message({
                                type: 'warning',
                                message: result.data.msg
                            });
                        }

					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			},
		    addFood(foodForm){
		    	this.$refs[foodForm].validate(async (valid) => {
					if (valid) {
					    if(this.foodForm.goodsUnit === '份'){
					        this.menuUnits.forEach((item) => {
                                if(item.name === this.foodForm.goodsUnit){
                                    this.foodForm.goodsUnit = item.id
                                }
                            })
                        }
					    if(this.foodForm.priceUnitId === '元'){
					        this.priceUnits.forEach((item) => {
                                if(item.name === this.foodForm.priceUnitId){
                                    this.foodForm.priceUnitId = item.id
                                }
                            })
                        }
						const params = {
							...this.foodForm,
                            catId: this.filterCategoryId(this.categoryForm.categorySelect),
						}
                        const result = await proxyError(addGoods(params));
                        if (result.data.code === window.config.STATE_OK) {
                            console.log(result)
                            this.$confirm('添加成功', '提示', {
                                confirmButtonText: '继续添加',
                                cancelButtonText: '去查看',
                                type: 'success'
                            }).then(() => {
                                this.foodForm = {
                                    cnName: '',
                                    cnInfo: '',
                                    picture: '',
                                    smallPicture: '',
                                    goodsUnit: '份',
                                    discountPrice: null,
                                    originPrice: null,
                                    priceUnitId: '元'
                                }
                            }).catch(() => {
                                this.$router.push('/goodsList')
                            });

                        }else{
                            this.$message({
                                type: 'error',
                                message: result.data.msg
                            });
                        }
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
		    }
		}
    }
</script>

<style lang="less">
	@import '../common/less/mixin.less';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.cell{
		text-align: center;
	}
</style>
