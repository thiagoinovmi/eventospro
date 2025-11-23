<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\Setting;

class MercadoPagoSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mercado Pago Settings Group
        $settings = [
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.access_token',
                'display_name' => 'Access Token',
                'value' => '',
                'details' => json_encode([
                    'description' => 'Token de acesso do Mercado Pago. Encontre em: Configurações → Credenciais → Access Token'
                ]),
                'type' => 'password',
                'order' => 1,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.public_key',
                'display_name' => 'Public Key',
                'value' => '',
                'details' => json_encode([
                    'description' => 'Chave pública do Mercado Pago. Encontre em: Configurações → Credenciais → Public Key'
                ]),
                'type' => 'text',
                'order' => 2,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.mode',
                'display_name' => 'Modo de Operação',
                'value' => 'test',
                'details' => json_encode([
                    'options' => [
                        'test' => 'Teste (Sandbox)',
                        'production' => 'Produção'
                    ],
                    'description' => 'Use "Teste" para desenvolver e testar. Use "Produção" apenas em ambiente de produção.'
                ]),
                'type' => 'select_dropdown',
                'order' => 3,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.webhook_url',
                'display_name' => 'URL do Webhook',
                'value' => url('/webhooks/mercadopago'),
                'details' => json_encode([
                    'description' => 'Configure esta URL no painel do Mercado Pago para receber notificações'
                ]),
                'type' => 'text',
                'order' => 4,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.webhook_token',
                'display_name' => 'Token do Webhook',
                'value' => '',
                'details' => json_encode([
                    'description' => 'Token para validar a autenticidade dos webhooks'
                ]),
                'type' => 'password',
                'order' => 5,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.enabled',
                'display_name' => 'Habilitar Mercado Pago',
                'value' => 1,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Desabilite para desativar temporariamente o Mercado Pago'
                ]),
                'type' => 'checkbox',
                'order' => 6,
            ],
        ];

        foreach ($settings as $setting) {
            // Check if setting already exists
            $exists = Setting::where('key', $setting['key'])->exists();
            
            if (!$exists) {
                Setting::create($setting);
            }
        }
    }
}
