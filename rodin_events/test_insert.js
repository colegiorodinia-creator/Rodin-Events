const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('', '');
async function test() {
    const { data, error } = await supabase.from('tasks').insert([{ title: 'Test Year', description: '', day: 1, month: 1, year: 2026, status: 'active' }]);
    console.log(error);
}
test();
