<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
import { ref } from "vue";

const categorys = ref([
    {
        "id":1,
        "categoryName": "food",
        "categoryAlias": "fd",
        "craeteTime": "2024-01-05 12:01:01",
        "updateTime": "2024-01-06 12:12:21"
    },
    {
        "id":1,
        "categoryName": "entertaiment",
        "categoryAlias": "et",
        "craeteTime": "2024-01-05 12:01:01",
        "updateTime": "2024-01-06 12:12:21"
    },
    {
        "id":1,
        "categoryName": "army",
        "categoryAlias": "am",
        "craeteTime": "2024-01-05 12:01:01",
        "updateTime": "2024-01-06 12:12:21"
    }
])
//调用后台服务
import { articleCategoryListService } from "@/api/article.js";
const articleCategoryList = async()=>{
    let result = await articleCategoryListService();
    categorys.value = result.data;
}
articleCategoryList();

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>Category</span>
                <div class="extra">
                    <el-button type="primary">
                        Add Category
                    </el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width:100%">
            <el-table-column label="No." width="100" type="index"></el-table-column>
            <el-table-column label="Category Name" prop="categoryName"></el-table-column>
            <el-table-column label="Category Alias" prop="categoryAlias"></el-table-column>
            <el-table-column label="Action" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"></el-button>
                    <el-button :icon="Delete" circle plain type="primary"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="No data..."/>
            </template>
        </el-table>
    </el-card>
</template>

<style lang="scss" scoped>
    .page-container{
        min-height: 100%;
        box-sizing: border-box;
        .header{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>