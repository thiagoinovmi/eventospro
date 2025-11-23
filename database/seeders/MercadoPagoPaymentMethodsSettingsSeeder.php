<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\Setting;

class MercadoPagoPaymentMethodsSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mercado Pago Payment Methods Settings
        $settings = [
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.credit_card.enabled',
                'display_name' => 'Cartão de Crédito - Habilitado',
                'value' => 1,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir pagamentos com cartão de crédito'
                ]),
                'type' => 'checkbox',
                'order' => 10,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.credit_card.installments_enabled',
                'display_name' => 'Cartão de Crédito - Parcelamento',
                'value' => 1,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir parcelamento em cartão de crédito'
                ]),
                'type' => 'checkbox',
                'order' => 11,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.credit_card.max_installments',
                'display_name' => 'Cartão de Crédito - Máx. Parcelas',
                'value' => 12,
                'details' => json_encode([
                    'description' => 'Número máximo de parcelas permitidas (1-12)'
                ]),
                'type' => 'text',
                'order' => 12,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.debit_card.enabled',
                'display_name' => 'Cartão de Débito - Habilitado',
                'value' => 1,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir pagamentos com cartão de débito'
                ]),
                'type' => 'checkbox',
                'order' => 13,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.debit_card.installments_enabled',
                'display_name' => 'Cartão de Débito - Parcelamento',
                'value' => 0,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir parcelamento em cartão de débito (geralmente não é permitido)'
                ]),
                'type' => 'checkbox',
                'order' => 14,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.debit_card.max_installments',
                'display_name' => 'Cartão de Débito - Máx. Parcelas',
                'value' => 1,
                'details' => json_encode([
                    'description' => 'Número máximo de parcelas permitidas (1-12)'
                ]),
                'type' => 'text',
                'order' => 15,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.boleto.enabled',
                'display_name' => 'Boleto - Habilitado',
                'value' => 1,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir pagamentos com boleto'
                ]),
                'type' => 'checkbox',
                'order' => 16,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.boleto.installments_enabled',
                'display_name' => 'Boleto - Parcelamento',
                'value' => 0,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir parcelamento em boleto (geralmente não é permitido)'
                ]),
                'type' => 'checkbox',
                'order' => 17,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.boleto.max_installments',
                'display_name' => 'Boleto - Máx. Parcelas',
                'value' => 1,
                'details' => json_encode([
                    'description' => 'Número máximo de parcelas permitidas (1-12)'
                ]),
                'type' => 'text',
                'order' => 18,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.pix.enabled',
                'display_name' => 'PIX - Habilitado',
                'value' => 1,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir pagamentos com PIX'
                ]),
                'type' => 'checkbox',
                'order' => 19,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.pix.installments_enabled',
                'display_name' => 'PIX - Parcelamento',
                'value' => 0,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir parcelamento em PIX (geralmente não é permitido)'
                ]),
                'type' => 'checkbox',
                'order' => 20,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.pix.max_installments',
                'display_name' => 'PIX - Máx. Parcelas',
                'value' => 1,
                'details' => json_encode([
                    'description' => 'Número máximo de parcelas permitidas (1-12)'
                ]),
                'type' => 'text',
                'order' => 21,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.wallet.enabled',
                'display_name' => 'Carteira Mercado Pago - Habilitado',
                'value' => 1,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir pagamentos com Carteira Mercado Pago'
                ]),
                'type' => 'checkbox',
                'order' => 22,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.wallet.installments_enabled',
                'display_name' => 'Carteira Mercado Pago - Parcelamento',
                'value' => 1,
                'details' => json_encode([
                    'on' => 'Habilitado',
                    'off' => 'Desabilitado',
                    'description' => 'Permitir parcelamento na Carteira Mercado Pago'
                ]),
                'type' => 'checkbox',
                'order' => 23,
            ],
            [
                'group' => 'Mercado Pago',
                'key' => 'mercadopago.payment_methods.wallet.max_installments',
                'display_name' => 'Carteira Mercado Pago - Máx. Parcelas',
                'value' => 12,
                'details' => json_encode([
                    'description' => 'Número máximo de parcelas permitidas (1-12)'
                ]),
                'type' => 'text',
                'order' => 24,
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
