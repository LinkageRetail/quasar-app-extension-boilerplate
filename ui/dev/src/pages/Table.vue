<template>
  <q-page padding>
    <Table selection="none" :columns="columns" v-model="datas">
      <template #body="props">
        <q-tr>
          <q-td key="userId">{{ props.row.userId }}</q-td>
          <q-td key="customerNo"> {{ props.row.customerNo }}</q-td>
          <q-td key="customerName">{{ props.row.firstName }} {{ props.row.lastName }}</q-td>
          <q-td key="phoneNo">
            <div>{{ props.row.phoneNo }}</div>
            <div>{{ props.row.email }}</div>
          </q-td>
        </q-tr>
      </template>
    </Table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      datas: [
        {
          userId: 1234,
          customerNo: 'VIP00001',
          firstName: 'Wu',
          lastName: 'Robby',
          phoneNo: '123456',
          email: 'robby@email.com',
        },
        {
          userId: 1235,
          customerNo: 'VIP00002',
          firstName: 'Chen',
          lastName: 'Jack',
          phoneNo: '123456',
          email: 'jack@email.com',
        },
      ],
      columns: [
        { name: 'userId', label: 'Member ID ', align: 'left' },
        { name: 'customerNo', label: 'Membership No.', align: 'left' },
        { name: 'customerName', label: 'Member Name', align: 'left' },
        { name: 'phoneNo', label: 'Phone No. / Email', align: 'left' },
      ],
    };
  },
};
</script>
