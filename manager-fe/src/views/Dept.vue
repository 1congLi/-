<template>
<div class="dept">
  <div class="query-form">
    <el-form  :inline="true" ref="queryForm" :model="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.deptName" placeholder="请输入部门名称"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDeptList">查询</el-button>
        <el-button @click="handleReset('queryForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="base-table">
     <div class="action">
       <el-button type="primary" @click="handlerOpen">创建</el-button>
     </div>
    <!--    用了v-bind=item动态绑定, 就不用写prop="column.prop"-->
    <!--          label="column.label" 可把column里的所有属性挂载上-->
    <el-table
        :data='deptList' row-key="_id" :tree-props="{children:children}"
    >
      <el-table-column
          v-for="item in column"
          :key="item.prop"
          v-bind="item"
      >
      </el-table-column>
      <el-table-column
          prop="columnProp"
          label="操作"
      >
        <template #default="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row._id)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        :title=" action == 'create' ? '创建部门':'编辑部门'"  v-model='showModal'>
      <el-form ref="dialogForm" :model="deptForm" :rules="rules" label-width="80px">
          <el-form-item prop="parentId" label="上级部门">
            <el-cascader
                v-model="deptForm.parentId"
                :options="deptList"
                :props="{checkStrictly:true,value:'_id',label:'deptName'}"
                clearable  show-all-levels="true"
                @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item prop="deptName" label="部门名称">
            <el-input v-model="deptForm.deptName" placeholder="请输入" ></el-input>
          </el-form-item>
          <el-form-item prop="user" label="负责人">
            <el-select v-model="deptForm.user" placeholder="请选中" @change="handleUser">
              <el-option
                  v-for="item in userList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="`${item.userId}/${item.userName}/${item.userEmail}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item prop="userEmail" label="负责人邮箱">
          <el-input v-model="deptForm.userEmail" placeholder="请输入"  disabled></el-input>
        </el-form-item>
      </el-form>
<!--      底部插槽foter-->
      <template #footer>
        <span>
          <el-button type="primary" @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

<!--    -->
    <el-table-column
        label="操作"
    >
      <template #default="scope">
        <el-button type="primary" @click="handleDetail(scope.row)">查看</el-button>
        <el-button type="primary" @click="handleDetail(scope.row._id)">作废</el-button>
      </template>
    </el-table-column>
    <el-dialog
        title="申请休假"
        width="30%"
        v-model="showDetailModel">
      <el-steps :active="3" finish-status="success" align-center>
        <el-step title="待审批"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
      <el-form ref="form" :model="form" >
          <el-form-item label="休假类型">
            <div>{{detail.applyTypeName}}</div>
          </el-form-item>
          <el-form-item label="休假时间">
            <div>{{detail.time}}</div>
          </el-form-item>
          <el-form-item label="休假时常">
            <div>{{detail.leaveTime}}</div>
          </el-form-item>

      </el-form>
    </el-dialog>
  </div>

</div>
</template>

<script>
import {reactive} from "vue";

export default {
name: "Dept.vue",
  data(){
    return{
      queryForm:{
        // deptName:''
      },
      deptList:[],
      column:[
        {
          label:'部门名称',
          prop:'deptName'
        },
        {
          label:'负责人',
          prop:'userName'
        },
        {
          label:'',
          prop:''
        },
      ],
      pager:{
        pageNum:1,
        pageSize:10
      },
      action:'create',
      showModal:false,
      deptForm:{
        parentId:[null]
      },
      rules:{
        parentId:[
          {
            required:true,
            message:'请选择',
            trigger:'blur'
          }
        ],
        deptName:[
          {
            required:true,
            message:'请选择',
            trigger:'blur'
          }
        ],
        user:[
          {
            required:true,
            message:'请选择',
            trigger:'blur'
          }
        ]
      },
      userList:[],
      //因为本身不会更改detail这个值，
      detail:ref({}),
      showDetailModel:true
    }
  },
  mounted() {
  this.getDeptList()
  this.getAllUserList()

  },
  methods:{
    async getDeptList(){
      let list = await this.$api.getDeptList({
          ...this.queryForm,
          // ...this.pager 树形的内容少，不同于用户组件，不需要分页
      })
      this.deptList = list
    },
    async getAllUserList(){
      this.userList = await this.$api.getAllUserList()
    },
    handleReset(form){
      this.$refs[form].resetFields()
    },
    handlerOpen(){
      this.action='create'
      this.showModal=true
    },
    handleEdit(row){
      this.action='edit'
      this.showModal=true
      this.$nextTick(()=>{
        //点编辑的时候，能显示负责人admin,需要拼接上user才可以.
        Object.assign(this.deptForm,row,{
          user:`${row.userId}/${row.userName}/${row.userEmail}`
        })
      })
    },
    async handleDelete(id){
      this.action='delete'
      // this.showModal=true 删除不需要弹框
      // this.handleSubmit()
      let res = await this.$api.deptOperate({_id,action:this.action})
      if(res){
        // this.showModal=false
        this.$message.success('删除成功')
        this.getDeptList()
        }
      },
    handleClose(){
      this.showModal = false;
      this.handleReset('dialogForm')
    },
    //怎么识别是创建、编辑还是删除呢，通过action
    handleSubmit(){
      this.$refs.dialogForm.validate(async (valid)=>{
        if(valid){
          let params = {...this.deptForm,action:this.action}
          delete params.user
          await this.$api.deptOperate(params)
          // this.showModal=false
          this.$message.success('操作成功')
          this.handleClose()
          this.getDeptList()
        }

      })
    },
    handleUser(val){
       const  [userId,userName,userEmail]= val.split('/')
      Object.assign(this.deptForm,{userId,userName,userEmail})
    },
    handleDetail((row) =>{
       showDetailModel.value =true
        let data ={...row}
        data.applyTypeName={
          1:'事假',
          2:'调休',
          3:'年假'
        }[data.applyType]
        data.applystateName={
         1:"待审批",
         2:"审判中",
         3:"审批拒绝",
         4:"审批通过",
         5:"作废",
        }[data.applyState]
        detail.value = data
}),
    //11
    // const handleUser1 =(key,val) =>{
    //   let {startTime,endTime} =leaveForm;
    //   if(!startTime || !endTime) return;
    //   if(startTime>endTime){
    //     ctx.$message.error('开始时间不能晚于结束日期')
    //     leaveForm.leaveTime = '0天'
    //     setTimeout(()=>{
    //       leaveForm[key] =''
    //     },0)
    //   }else{
    //     leaveForm.leaveTime =((endTime-startTime)/(24*60*60*1000))+1
    //   }
    // },


  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
