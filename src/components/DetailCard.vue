<template>
    <a-card
            style="width: 480px"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="key => onTabChange(key)"
            :hoverable="true"
    >
        <template #title>{{ result.name }}</template>
        <template #extra>
            <a :href="detailInfo.detail_url" target="_blank" title="在百度地图中打开">
                <export-outlined style="color: black"/>
            </a>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <close-outlined @click="closeCard" style="color: black"/>
        </template>

        <template #customTab="item">
            <span v-if="item.key === '概览'">
                {{ item.key }}
            </span>
        </template>

        <template #action>
            <a-button>获取距离</a-button>
        </template>

        <div class="general" v-if="key === 'tab1'">
            <div v-if="detailInfo.content_tag">
                <a-tag color="purple" v-for="tag in detailInfo.content_tag.split(';')">{{ tag }}</a-tag>
            </div>
            <div v-if="result.address"><span class="label"><home-outlined/>&nbsp;&nbsp;地址:&nbsp;&nbsp;</span><span
                    class="info">{{
                result.address
                }}</span>
            </div>
            <div v-if="result.telephone"><span class="label"><phone-outlined/>&nbsp;&nbsp;电话号码:&nbsp;&nbsp;</span><span
                    class="info">
                <a :href="'tel:' + result.telephone">{{ result.telephone }}</a>
            </span></div>
            <div v-if="detailInfo.price"><span class="label"><pay-circle-outlined/>&nbsp;&nbsp;人均消费:&nbsp;&nbsp;¥&nbsp;</span><span
                    class="info">{{
                detailInfo.price
                }}</span>
            </div>
            <div v-if="detailInfo.featured_service"><span class="label"><customer-service-outlined/>&nbsp;&nbsp;服务选项:&nbsp;&nbsp;</span>
                <span class="info" v-for="service in detailInfo.featured_service">
                    <a-tag color="red">{{ service }}</a-tag>
                </span></div>
            <div v-if="detailInfo.atmosphere"><span class="label"><team-outlined/>&nbsp;&nbsp;适合情景:&nbsp;&nbsp;</span>
                <span class="info" v-for="at in detailInfo.atmosphere">
                    <a-tag color="blue">{{ at }}</a-tag>
                </span>
            </div>
        </div>

        <div v-if="key === 'tab2'">
            <div v-if="detailInfo.overall_rating"><span class="label">总体评分:&nbsp;&nbsp;</span>
                <a-rate :value="Number(detailInfo.overall_rating)" allow-half disabled/>&nbsp;&nbsp;
                {{ detailInfo.overall_rating }}
            </div>
            <div v-if="detailInfo.taste_rating"><span class="label">美食评分:&nbsp;&nbsp;</span>
                <a-rate :value="Number(detailInfo.taste_rating)" allow-half disabled/>&nbsp;&nbsp;
                {{ detailInfo.taste_rating }}
            </div>
            <div v-if="detailInfo.service_rating"><span class="label">服务评分:&nbsp;&nbsp;</span>
                <a-rate :value="Number(detailInfo.service_rating)" allow-half disabled/>&nbsp;&nbsp;
                {{ detailInfo.service_rating }}
            </div>
            <div v-if="detailInfo.environment_rating"><span class="label">环境评分:&nbsp;&nbsp;</span>
                <a-rate :value="Number(detailInfo.environment_rating)" allow-half disabled/>&nbsp;&nbsp;
                {{ detailInfo.environment_rating }}
            </div>
        </div>

    </a-card>
</template>

<script>
import {getDetailedInfo} from "@/requests";
import closeOutlined from "@ant-design/icons-vue/lib/icons/CloseOutlined";
import exportOutlined from "@ant-design/icons-vue/lib/icons/ExportOutlined";
import homeOutlined from "@ant-design/icons-vue/lib/icons/HomeOutlined";
import phoneOutlined from "@ant-design/icons-vue/lib/icons/PhoneOutlined";
import payCircleOutlined from "@ant-design/icons-vue/lib/icons/PayCircleOutlined";
import customerServiceOutlined from "@ant-design/icons-vue/lib/icons/CustomerServiceOutlined";
import teamOutlined from "@ant-design/icons-vue/lib/icons/TeamOutlined";

export default {
    name: "DetailCard",
    components: {
        closeOutlined,
        exportOutlined,
        homeOutlined,
        phoneOutlined,
        payCircleOutlined,
        customerServiceOutlined,
        teamOutlined
    },
    props: ['uid'],
    data() {
        return {
            result: {},
            detailInfo: {},
            tabList: [
                {
                    key: 'tab1',
                    tab: '概览',
                }, {
                    key: 'tab2',
                    tab: '评价',
                }
            ],
            key: 'tab1',
        }
    },
    methods: {
        onTabChange(value) {
            this.key = value;
        },
        closeCard() {
            this.$emit('closeCard')
        }
    },
    mounted() {
        getDetailedInfo(this.uid)
            .then(res => {
                this.result = res.data.result
                this.detailInfo = res.data.result.detail_info
            })
            .catch(err => console.log(err.message))
    },
    watch: {
        "uid"(newVal, oldVal) {
            getDetailedInfo(newVal)
                .then(res => {
                    this.result = res.data.result
                    this.detailInfo = res.data.result.detail_info
                })
                .catch(err => console.log(err.message))
        }
    }
}
</script>

<style scoped>
.general div {
    padding: 8px 0;
}

.label {
    font-weight: bold;
}

</style>
