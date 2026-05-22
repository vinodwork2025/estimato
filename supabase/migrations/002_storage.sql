-- Create public storage bucket for PDF reports
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'reports',
  'reports',
  true,
  5242880, -- 5 MB
  array['application/pdf']
)
on conflict (id) do nothing;

-- Allow anon users to upload (for client-side generation)
create policy "anon_upload_reports"
on storage.objects for insert
to anon
with check (bucket_id = 'reports');

-- Allow public reads
create policy "public_read_reports"
on storage.objects for select
to public
using (bucket_id = 'reports');
