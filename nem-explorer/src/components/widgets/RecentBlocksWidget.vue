<template>
    <Card :loading="loading">
        <template #title>
            Recent Blocks
        </template>

        <template #control>
            <router-link to="/blocks">
                <ButtonMore> View all blocks </ButtonMore>
            </router-link>
        </template>

        <template #body>
            <b-container fluid>
            <b-row>
                <b-col 
                    sm="6"
                    md="3"
                    lg="6"
                    v-for="(item, index) in blockList"
                    :key="'recent_blocks_'+index+'_'+item.height"
                >
                    <Card 
                        class='card-item'
                        :item="item"
                    >
                        <template #header>
                            <router-link
                                :to="'/block/'+item.height"
                                class="ex-title-text" 
                                :title="'Block height: ' + item.height"
                            >
                                {{item.height}}
                            </router-link>
                        </template>
                        <template #body>
                            <div class="ex-row">
                                <div class="ex-text">
                                    {{ item.numTransactions }} Transactions
                                </div>
                                <div class="ex-text">
                                    <Age :date="item.date"/>
                                </div>
                            </div>
                            <div class="ex-row no-wrap">
                                <div class="ex-text">
                                    Harvester
                                </div>
                                <router-link
                                    :to="'/account/'+item.signer"
                                    class="ex-long-text ex-account-text" 
                                    :title="item.signer"
                                >
                                    {{item.signer}}
                                </router-link>
                            </div>
                        </template>
                    </Card>
                </b-col>
            </b-row> 
            </b-container> 
        </template>
    </Card>
</template>

<script>
import Card from '@/components/containers/Card.vue'
import ButtonMore from '@/components/controls/ButtonMore.vue'
import Age from '@/components/Age.vue'
import { mapGetters } from 'vuex'

export default {
    components: { 
        Card, 
        ButtonMore,
        Age 
    },

    computed: {
        ...mapGetters({
            blockList: 'block/getRecentList',
            loading: 'block/getLoading'
        })
    }
}
</script>

<style lang="scss" scoped>
.card-item::before {
    width: 4px;
    content: '';
    height: 100%;
    position: absolute;
    padding: 0;
    left: 0;
    top: 0;
    background: #3e6b8c;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.card-item {
    .card-body {
        padding: 0;

        .ex-title-text {
            color: black;
        }

        .ex-row {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            
            .ex-text {
                font-size: 10px;
                color: #acacac;
            }

            .ex-long-text {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .ex-account-text {
                color: #84accb;
                font-weight: 600;
                font-size: 12px;
                margin-left: 20px;
            }
        }

        .no-wrap {
            flex-wrap: nowrap;
        }
    }
}
</style>